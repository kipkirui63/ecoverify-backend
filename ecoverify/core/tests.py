from django.test import Client, TestCase

from .models import UploadedEvidence, UserProfile, VerificationSubmission


class ApiWorkflowTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_user_can_register_submit_and_fetch_submission(self):
        register_response = self.client.post(
            "/api/auth/register",
            {"email": "owner@example.com", "phoneNumber": "+254700000000", "password": "password123"},
            content_type="application/json",
        )

        self.assertEqual(register_response.status_code, 201)
        register_payload = register_response.json()
        token = register_payload["accessToken"]
        self.assertEqual(register_payload["user"]["phoneNumber"], "+254700000000")
        self.assertEqual(UserProfile.objects.count(), 1)

        profile_payload = {
            "businessName": "Eco Shop",
            "country": "Kenya",
            "platform": "Shopify",
            "website": "https://ecoshop.example",
            "contactName": "Amina Owner",
            "contactEmail": "owner@example.com",
            "contactPhone": "+254711111111",
        }
        profile_response = self.client.post(
            "/api/profile",
            profile_payload,
            content_type="application/json",
            headers={"Authorization": f"Bearer {token}"},
        )

        self.assertEqual(profile_response.status_code, 200)
        self.assertEqual(profile_response.json()["profile"]["businessName"], "Eco Shop")
        self.assertEqual(profile_response.json()["profile"]["contactPhone"], "+254711111111")

        payload = {
            "form": {
                "businessName": "Eco Shop",
                "contactEmail": "owner@example.com",
                "files": [{"name": "certificate.pdf", "size": 1000, "type": "application/pdf"}],
            },
            "report": {
                "productName": "Organic Soap",
                "category": "Organic & Natural",
                "status": "Verified",
                "badgeTier": "Gold",
                "verifiedAt": "Today",
                "badgeMessage": "Verification completed.",
                "anomalies": [],
            },
        }

        create_response = self.client.post(
            "/api/submissions",
            payload,
            content_type="application/json",
            headers={"Authorization": f"Bearer {token}"},
        )

        self.assertEqual(create_response.status_code, 201)
        self.assertEqual(VerificationSubmission.objects.count(), 1)
        self.assertEqual(UploadedEvidence.objects.count(), 1)

        list_response = self.client.get(
            "/api/submissions",
            headers={"Authorization": f"Bearer {token}"},
        )

        self.assertEqual(list_response.status_code, 200)
        submissions = list_response.json()["submissions"]
        self.assertEqual(len(submissions), 1)
        self.assertEqual(submissions[0]["product"]["name"], "Organic Soap")
