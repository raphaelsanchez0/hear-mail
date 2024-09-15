import { NextRequest, NextResponse } from 'next/server';
import textToSpeech, { protos } from '@google-cloud/text-to-speech';

const client = new textToSpeech.TextToSpeechClient();

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: protos.google.cloud.texttospeech.v1.SsmlVoiceGender.MALE },
    audioConfig: { audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3 },
  };

  const [response] = await client.synthesizeSpeech(request);

  if (response.audioContent) {
    const audioBase64 = Buffer.from(response.audioContent).toString('base64');
    return NextResponse.json({ audioContent: audioBase64 });
  } else {
    return NextResponse.json({ message: 'Failed to create audio' }, { status: 500 });
  }
}
