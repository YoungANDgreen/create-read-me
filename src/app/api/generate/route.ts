import { NextRequest, NextResponse } from 'next/server';
import { buildGenerationPrompt, GeneratorConfig } from '@/lib/generator';
import { analyzePost, PostAnalysis } from '@/lib/algorithm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { config, apiKey, provider } = body as {
      config: GeneratorConfig;
      apiKey?: string;
      provider?: 'openai' | 'anthropic';
    };

    if (!config || !config.topic || !config.niche) {
      return NextResponse.json(
        { error: 'Missing required configuration' },
        { status: 400 }
      );
    }

    // If no API key provided, return error
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key required for AI generation. Use template mode for free generation.' },
        { status: 400 }
      );
    }

    const prompt = buildGenerationPrompt(config);
    let generatedContent = '';

    if (provider === 'anthropic') {
      // Use Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return NextResponse.json(
          { error: `Anthropic API error: ${error}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      generatedContent = data.content[0].text;
    } else {
      // Use OpenAI API (default)
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert X (Twitter) content creator. Generate engaging posts optimized for virality.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 1024,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return NextResponse.json(
          { error: `OpenAI API error: ${error}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      generatedContent = data.choices[0].message.content;
    }

    // Analyze the generated content
    const analysis: PostAnalysis = analyzePost(generatedContent, config.niche);

    // Generate variations by modifying the content slightly
    const variations = generateAIVariations(generatedContent);

    return NextResponse.json({
      content: generatedContent,
      analysis,
      variations,
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate post' },
      { status: 500 }
    );
  }
}

function generateAIVariations(content: string): string[] {
  const lines = content.split('\n').filter(l => l.trim());
  const variations: string[] = [];

  // Variation 1: Add urgency
  if (lines.length > 0) {
    const urgentStart = ['Stop scrolling.', 'Read this carefully:', 'This is important:'];
    const randomUrgent = urgentStart[Math.floor(Math.random() * urgentStart.length)];
    variations.push(`${randomUrgent}\n\n${content}`);
  }

  // Variation 2: Question format
  const questionEnd = '\n\nWhat do you think? Let me know below.';
  variations.push(content + questionEnd);

  // Variation 3: Thread teaser
  const threadTeaser = content + '\n\n(Thread on this coming tomorrow. Follow to not miss it.)';
  variations.push(threadTeaser);

  return variations.slice(0, 3);
}
