import React from 'react';
import { X, Sparkles, Check, ShoppingBag, Trophy, Star, Gem } from 'lucide-react';
import { SHOP_ITEMS, GUIDE_AVATAR_IMG, BUNNY_BUDDY_IMG } from '../data/flashcards';
import { ShopItem, UserStats } from '../types';
import { playSound } from '../utils/audio';

interface MyRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  onBuyItem: (item: ShopItem) => void;
  onEquipItem: (item: ShopItem) => void;
}

export const MyRoomModal: React.FC<MyRoomModalProps> = ({
  isOpen,
  onClose,
  stats,
  onBuyItem,
  onEquipItem
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#FFFDF5] border-8 border-purple-400 rounded-[3rem] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-6 py-4 flex items-center justify-between text-white border-b-4 border-purple-300">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-300 rounded-2xl text-purple-900 font-bold shadow">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black font-sans">My Room & Buddy Shop</h2>
              <p className="text-xs text-purple-200">Dress up your pet and customize your garden!</p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('pop');
              onClose();
            }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Pet & Room Preview Card */}
          <div className="relative w-full h-48 md:h-56 bg-gradient-to-b from-sky-200 to-emerald-100 rounded-3xl border-4 border-amber-300 p-4 shadow-inner flex items-center justify-center overflow-hidden">
            {/* Background sparkle accents */}
            <div className="absolute inset-0 flex items-center justify-around opacity-20 text-indigo-900 select-none pointer-events-none">
              <Sparkles className="w-16 h-16" />
              <Sparkles className="w-24 h-24" />
              <Sparkles className="w-16 h-16" />
            </div>

            {/* Pet / Avatar Preview */}
            <div className="relative z-10 flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-amber-100">
                  <img
                    src={BUNNY_BUDDY_IMG}
                    alt="Bunny Buddy"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {stats.equippedHat && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl font-black bg-amber-300 px-2 py-0.5 rounded-full border-2 border-white shadow animate-bounce">
                    <Sparkles className="w-5 h-5 text-indigo-900 inline" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shop Items Grid */}
          <div>
            <h3 className="text-lg font-black text-indigo-950 font-sans mb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-600" />
              <span>Available Accessories</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {SHOP_ITEMS.map((item) => {
                const isOwned = stats.unlockedItems.includes(item.id);
                const isEquipped = stats.equippedHat === item.icon || stats.equippedSticker === item.icon;

                return (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-2xl border-2 border-purple-200 shadow-md flex flex-col items-center justify-between text-center gap-2"
                  >
                    <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 shadow-inner flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>

                    <div>
                      <p className="font-extrabold text-sm text-indigo-950">{item.name}</p>
                      <p className="text-xs font-bold text-purple-600 flex items-center justify-center gap-1">
                        {item.price} {item.currency === 'stars' ? <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> : <Gem className="w-3.5 h-3.5 text-purple-500" />}
                      </p>
                    </div>

                    {isOwned ? (
                      <button
                        onClick={() => {
                          playSound('click');
                          onEquipItem(item);
                        }}
                        className={`w-full py-1.5 rounded-xl font-bold text-xs transition-all ${
                          isEquipped
                            ? 'bg-emerald-500 text-white shadow'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {isEquipped ? 'Equipped ✓' : 'Equip'}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          playSound('pop');
                          onBuyItem(item);
                        }}
                        className="w-full py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition-all"
                      >
                        Buy Item
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
