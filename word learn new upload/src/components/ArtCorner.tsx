import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Download, Trash2, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

interface ArtCornerProps {
  onEarnReward: (stars: number, gems: number) => void;
}

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#a855f7', '#ec4899', '#1e293b'];
const STICKERS = ['🍎', '⭐', '🐰', '🐵', '🌸', '🌈'];

export const ArtCorner: React.FC<ArtCornerProps> = ({ onEarnReward }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ef4444');
  const [brushSize, setBrushSize] = useState(8);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (selectedSticker) {
      ctx.font = '40px sans-serif';
      ctx.fillText(selectedSticker, x - 20, y + 15);
      playSound('pop');
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || selectedSticker) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    playSound('click');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleDownload = () => {
    playSound('star');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'word-garden-artwork.png';
    a.click();
    onEarnReward(10, 2);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between w-full max-w-4xl mx-auto px-1 sm:px-3 py-1 select-none h-full min-h-0 overflow-y-auto">
      <div className="w-full bg-[#FFFDF5] border-4 sm:border-6 border-fuchsia-400 rounded-2xl sm:rounded-3xl md:rounded-[3rem] shadow-xl p-3 sm:p-5 flex flex-col items-center gap-3 sm:gap-4 flex-1 min-h-0">
        {/* Color Palette & Brush Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 w-full bg-fuchsia-50 p-3 rounded-2xl border border-fuchsia-200">
          {/* Colors */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  playSound('pop');
                  setColor(c);
                  setSelectedSticker(null);
                }}
                className={`w-7 h-7 md:w-9 md:h-9 rounded-full transition-transform ${
                  color === c && !selectedSticker ? 'scale-125 ring-4 ring-fuchsia-300 shadow-md' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Stickers */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {STICKERS.map((stk) => (
              <button
                key={stk}
                onClick={() => {
                  playSound('pop');
                  setSelectedSticker(selectedSticker === stk ? null : stk);
                }}
                className={`text-xl md:text-2xl p-1.5 rounded-xl transition-transform ${
                  selectedSticker === stk ? 'bg-amber-300 scale-125 shadow-md' : 'hover:bg-amber-100'
                }`}
              >
                {stk}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="p-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-1 shadow"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="w-full h-80 md:h-[360px] bg-white rounded-3xl border-4 border-fuchsia-200 shadow-inner overflow-hidden cursor-crosshair relative">
          <canvas
            ref={canvasRef}
            width={700}
            height={400}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
