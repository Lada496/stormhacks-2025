import { NextResponse } from "next/server";
import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

function printNestedObjects(obj, indent = 0) {
  const indentation = "  ".repeat(indent);

  if (typeof obj !== "object" || obj === null) {
    console.log(indentation + obj);
    return;
  }

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      console.log(`${indentation}${key}: {`);
      printNestedObjects(obj[key], indent + 1);
      console.log(`${indentation}}`);
    } else {
      console.log(`${indentation}${key}: ${obj[key]}`);
    }
  }
}

const bedrockClient = new BedrockAgentRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  try {
    const { resume, jobDescription } = await request.json();
    console.log({ resume, jobDescription });

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: "Both resume and jobDescription are required" },
        { status: 400 }
      );
    }

    // 3. Combine inputs into a prompt
    const prompt = `Resume:\n${resume}\n\nJob Description:\n${jobDescription}\n\nProvide an evaluation of the candidate's fit for this role. Template must be Score: <number>\n Feedback: <feedback>`;

    const command = new InvokeAgentCommand({
      agentId: "J1MWWVMZM9", // replace with your agent/model ID
      inputText: prompt,
      agentAliasId: "DPRLHUJKQ0",
      sessionId: "session-id",
    });

    const response = await bedrockClient.send(command);
    // printNestedObjects(response);
    // console.log(util.inspect(response, false, null, true /* enable colors */))
    // Decode the stream messages
    // Extract the model's text
    let completion = "";
    for await (const chunkEvent of response.completion) {
      const chunk = chunkEvent.chunk;
      console.log(chunk);
      const decodedResponse = new TextDecoder("utf-8").decode(chunk.bytes);
      completion += decodedResponse;
    }

    // Extract score and feedback (case-insensitive)
    const scoreMatch = completion.match(/score:\s*(\d+)/i);
    const feedbackMatch = completion.match(/feedback:\s*([\s\S]+)/i);

    const nextResponse = {
      score: scoreMatch ? parseInt(scoreMatch[1]) : null,
      feedback: feedbackMatch ? feedbackMatch[1].trim() : null,
    };

    console.log({ nextResponse });

    return NextResponse.json(nextResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to call agent", details: error.message },
      { status: 500 }
    );
  }
}
