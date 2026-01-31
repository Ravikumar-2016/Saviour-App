import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

admin.initializeApp()

interface SendNotificationData {
  tokens: string[]
  title: string
  body: string
  sosId: string
}

interface NotificationResponse {
  successCount: number
  failureCount: number
}

// Callable function to send notifications
export const sendSOSNotification = functions.https.onCall<
  SendNotificationData,
  NotificationResponse
>(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can send notifications"
    )
  }

  const { tokens, title, body, sosId } = data

  if (
    !tokens ||
    !Array.isArray(tokens) ||
    tokens.length === 0 ||
    !title ||
    !body ||
    !sosId
  ) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing required fields"
    )
  }

  try {
    const message = {
      notification: { title, body },
      data: { sosId },
      tokens: tokens,
    }

    const response = await admin.messaging().sendMulticast(message)
    return {
      successCount: response.successCount,
      failureCount: response.failureCount,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    functions.logger.error("Error sending notifications:", error)
    throw new functions.https.HttpsError(
      "internal",
      `Failed to send notifications: ${errorMessage}`
    )
  }
})