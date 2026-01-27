import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Section } from './ui/Section';
import { Button } from './ui/Button';

export const ImageGenSection: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        }
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            setImageUrl(`data:image/png;base64,${base64EncodeString}`);
            foundImage = true;
            break;
          }
        }
      }
      
      if (!foundImage) {
        const textPart = response.candidates?.[0]?.content?.parts?.find(p => p.text);
        throw new Error(textPart?.text || "Geen afbeelding gegenereerd.");
      }

    } catch (err: any) {
      console.error(err);
      setError("Er ging iets mis bij het genereren. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section bgColor="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="md:pr-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Probeer het zelf
          </h2>
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            Programmatic video begint met slimme assets. Ervaar de kracht van generatieve AI voor jouw content.
          </p>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-neutral-900 mb-2">
                Beschrijf je asset
              </label>
              <textarea
                id="prompt"
                rows={4}
                className="w-full p-4 text-lg bg-neutral-50 border border-neutral-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-colors resize-none placeholder:text-neutral-400"
                placeholder="Bijv: Een abstracte compositie van glas en neon licht in oranje tinten..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button 
                onClick={handleGenerate} 
                disabled={loading || !prompt.trim()}
                className="w-full sm:w-auto"
              >
                {loading ? 'Genereren...' : 'Genereer Asset'}
              </Button>
              {error && (
                <span className="text-red-600 text-sm">{error}</span>
              )}
            </div>
          </div>
        </div>

        <div className="relative aspect-square bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden">
          {loading ? (
             <div className="text-center">
                <div className="inline-block w-8 h-8 border-4 border-neutral-200 border-t-black rounded-full animate-spin mb-4"></div>
                <p className="text-neutral-500 font-medium">Bezig met renderen...</p>
             </div>
          ) : imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Generated asset" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-neutral-400 text-center px-8">
              <div className="w-16 h-16 border-2 border-dashed border-neutral-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                 <span className="text-2xl font-light">+</span>
              </div>
              <p>Je gegenereerde asset verschijnt hier</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};