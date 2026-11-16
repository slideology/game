"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buildShareModel, drawShareCard, SHARE_CARD_HEIGHT, SHARE_CARD_WIDTH, sharePalette, shareText } from "@/lib/share";
import type { Run } from "@/lib/game";

export function SharePanel({ run }: { run: Run }) {
  const model = buildShareModel(run);
  const text = shareText(model);
  const [message, setMessage] = useState("The card shows score bands only. It leaves out event names, places, and years.");

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Copied. If a paste looks empty, select the text below instead.");
    } catch {
      setMessage("Copy was blocked. Select the text below and copy it yourself.");
      document.getElementById("share-text")?.focus();
    }
  }

  function downloadImage() {
    const canvas = document.createElement("canvas");
    canvas.width = SHARE_CARD_WIDTH;
    canvas.height = SHARE_CARD_HEIGHT;
    const context = canvas.getContext("2d");
    if (!context) {
      setMessage("This browser could not draw an image. Use the text below.");
      return;
    }
    const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    drawShareCard(context, model, sharePalette(theme));
    canvas.toBlob((blob) => {
      if (!blob) {
        setMessage("The image could not be saved. Use the text below.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `meridian-${run.utcDate}.png`;
      link.click();
      URL.revokeObjectURL(url);
      setMessage("Image downloaded. It contains the score and bands, not the answers.");
    });
  }

  return (
    <section className="min-w-0 rounded-xl border border-border bg-card p-4 sm:p-5" aria-labelledby="share-heading">
      <h2 id="share-heading" className="font-display text-2xl text-foreground">
        Share the score
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground" aria-live="polite">
        {message}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" className="h-11 px-4" onClick={copyText}>
          Copy text
        </Button>
        <Button type="button" variant="outline" className="h-11 px-4" onClick={downloadImage}>
          Download image
        </Button>
      </div>
      <label htmlFor="share-text" className="mt-4 block text-sm text-muted-foreground">
        Result text, if copy or download is blocked
      </label>
      <textarea
        id="share-text"
        data-testid="share-text"
        readOnly
        value={text}
        rows={12}
        className="mt-1 w-full min-w-0 resize-y rounded-lg border border-input bg-background p-3 font-mono text-sm leading-6 text-foreground"
        onFocus={(event) => event.currentTarget.select()}
      />
    </section>
  );
}
