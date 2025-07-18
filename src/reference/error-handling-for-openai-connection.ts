// try {
//       // Connect the agent
//       const realtimeClient = await streamVideo.video.connectOpenAi({
//         call,
//         openAiApiKey: process.env.OPENAI_API_KEY!,
//         agentUserId: existingAgent.id,
//       });

//       realtimeClient.updateSession({
//         instructions: existingAgent.instructions,
//       });
// +    } catch (error) {
// +      console.error("Failed to connect OpenAI agent:", error);
// +      // Consider whether to revert the meeting status update
// +      return NextResponse.json(
// +        { error: "Failed to connect agent" },
// +        { status: 500 }
// +      );
// +    }
