'use client';

interface RewardProgressProps {
  levelStatus: string;
  accumulatedVolumeUsd: number;
  targetVolumeUsd: number;
}

export default function IphoneRewardProgress({
  levelStatus,
  accumulatedVolumeUsd,
  targetVolumeUsd,
}: RewardProgressProps) {
  const percentage = Math.min(
    Math.round((accumulatedVolumeUsd / targetVolumeUsd) * 100),
    100
  );

  const formattedAccumulated = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(accumulatedVolumeUsd);

  const formattedTarget = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(targetVolumeUsd);

  const isLevel3 = levelStatus === 'Level 3';

  return (
    <div className="rounded-2xl border border-secondary-surface bg-[#142800]/30 p-6 backdrop-blur-md relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-primary-accent/10 blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-bold text-primary-accent uppercase tracking-widest font-body">
            EXCLUSIVE MEMBER PROGRAM
          </span>
          <h3 className="font-heading text-xl font-bold text-white mt-1 flex items-center gap-2">
            <span>📱</span> iPhone Reward Tracker
          </h3>
          <p className="font-body text-xs text-gray-400 mt-1">
            Akumulasi volume trading partner Anda untuk mengklaim unit iPhone resmi Stonevalley.
          </p>
        </div>

        {!isLevel3 && (
          <span className="rounded-lg bg-yellow-500/10 border border-yellow-500/30 px-3 py-1 font-body text-[11px] font-semibold text-yellow-400 self-start">
            Khusus Member Level 3
          </span>
        )}
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-gray-300">
            Progress Volume: <strong className="text-white">{formattedAccumulated}</strong> / {formattedTarget}
          </span>
          <span className="font-bold text-primary-accent text-sm">
            {percentage}%
          </span>
        </div>

        {/* Neon Glowing Progress Bar */}
        <div className="h-4 w-full rounded-full bg-[#080A08] border border-secondary-surface p-0.5 relative overflow-hidden">
          <div
            className="h-full rounded-full bg-primary-accent shadow-[0_0_15px_#8fec00] transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] font-body text-gray-400 pt-1">
          <span>Target: {formattedTarget} Trading Volume</span>
          <span>
            {percentage >= 100 ? (
              <strong className="text-primary-accent">🎉 Target Tercapai! Hubungi Admin.</strong>
            ) : (
              `Sisa ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(targetVolumeUsd - accumulatedVolumeUsd)} lagi`
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
