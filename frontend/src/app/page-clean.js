import VoiceGenerator from "@/app/components/interview/VoiceGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          StormHacks 2025 - Voice App
        </h1>
        <VoiceGenerator />
      </div>
    </div>
  );
}