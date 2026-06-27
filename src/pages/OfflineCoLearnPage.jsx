import { SlashTitle, BrutalCard } from '../components.jsx';
import { useI18n } from '../i18n.jsx';
import { useState } from 'react';

const modules = [
  {
    id: 'module1',
    title: '模块一：边界重建',
    desc: '通过辩论与柔术结合，重建个人边界与自信。',
    courses: [
      {
        num: '01',
        title: '辩论·柔术',
        icon: '🗣️🥋',
        desc: '融合辩论说服力与巴西柔术地面技巧，强化语言与身体的双重边界意识。适合低能量时快速重建掌控感。',
      },
    ],
  },
  {
    id: 'module2',
    title: '模块二：格斗系列',
    desc: '模拟真实环境下的生存与反击技能。',
    courses: [
      {
        num: '02',
        title: '车内柔术/道具柔术',
        icon: '🚗🥋',
        desc: '针对狭小车内空间的脱困与反制柔术，练习在受限环境中保持冷静与有效动作。利用道具模拟抢夺武器的街头实战。',
      },
      {
        num: '03',
        title: '防身脏技',
        icon: '👊💥',
        desc: '真实高危场景下的非常规自保招式，优先求生、制造机会逃脱或求助。',
      },
      {
        num: '04',
        title: '拳课',
        icon: '🥊🌲',
        desc: '自然环境中的格斗基础与体能整合训练，提升野外应变能力。',
      },
      {
        num: '05',
        title: '兵击',
        icon: '⚔️🛡️',
        desc: '安全海绵剑与兵击对练，训练距离判断、时机把握与安全反击意识。',
      },
      {
        num: '06',
        title: '菲律宾短棍',
        icon: '🥢📏',
        desc: '菲律宾武术短棍基础，掌握距离管理与随手武器转化，提升防身距离感。',
      },
    ],
  },
  {
    id: 'module3',
    title: '模块三：真实场景生存',
    desc: '真实环境下的格斗体能与实战循环。',
    courses: [
      {
        num: '07',
        title: '核心体能',
        icon: '🏃‍♀️🌿',
        desc: '核心力量、耐力与稳定性训练，打造野外生存所需的体能基础。',
      },
      {
        num: '08',
        title: '格斗体能循环',
        icon: '🏋️‍♂️🔄',
        desc: '结合格斗动作的循环训练，提升爆发力、恢复力与实战耐力。',
      },
      {
        num: '09',
        title: '跑酷·城市逃脱',
        icon: '🏃‍♂️🏙️',
        desc: '跑酷机动与城市环境逃脱技巧，增强在复杂城市中的快速移动与脱身能力。',
      },
    ],
  },
];

export default function OfflineCoLearnPage() {
  const { t } = useI18n();
  const [showQR, setShowQR] = useState(false);
  const darkTextNums = new Set(['01', '03', '04', '06', '07', '09']);

  return (
    <>
      <SlashTitle
        eyebrow="OFFLINE CO-LEARN"
        title="线下共学"
        subtitle="9门线下课程体系 · 模块化实战共学（逐步上线中）"
      />

      {modules.map((mod) => (
        <div key={mod.id} className="mb-8">
          <h2 className="font-display text-2xl text-blood mb-1">{mod.title}</h2>
          <p className="text-sm text-ash mb-3">{mod.desc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mod.courses.map((course, idx) => {
              const isDarkText = darkTextNums.has(course.num);
              const isBlackText = course.num === '02' || course.num === '03';
              const cardIsDark = idx % 2 === 1;
              const titleClass = isBlackText 
                ? (cardIsDark ? 'text-paper' : 'text-black') 
                : (cardIsDark ? 'text-paper' : (isDarkText ? 'text-[#333333]' : 'text-paper'));
              const descClass = isBlackText 
                ? (cardIsDark ? 'text-ash' : 'text-black') 
                : (cardIsDark ? 'text-ash' : (isDarkText ? 'text-[#555555]' : 'text-ash'));
              return (
                <BrutalCard key={idx} dark={idx % 2 === 1}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display text-3xl text-blood">{course.num}</span>
                    <span className="text-2xl">{course.icon}</span>
                  </div>
                  <h3 className={`font-display text-xl mb-1 ${titleClass}`}>
                    {course.title}
                  </h3>
                  <p className={`text-sm font-bold leading-snug ${descClass}`}>
                    {course.desc}
                  </p>
                </BrutalCard>
              );
            })}
          </div>
        </div>
      ))}

    <div style={{display:'none'}} data-deploy="2026-06-26-v1" />

      {/* 匿名信风格手机 - 去掉字母按键，中间大文字 + 下方发送按钮 (match homepage phantom letter) */}
      <div
        onClick={() => setShowQR(true)}
        className="p5-phone p5-phantom-phone fixed bottom-[82px] right-4 cursor-pointer"
        title="点击查看微信二维码"
      >
        <div className="p5-phone-outer phantom-letter-paper">
          {/* tapes like homepage anonymous letter */}
          <span className="phantom-tape phantom-tape-left" aria-hidden="true" />
          <span className="phantom-tape phantom-tape-right" aria-hidden="true" />

          {/* red/black accent slices for P5 strength */}
          <div className="p5-phantom-red-slice" aria-hidden="true" />

          {/* inner phone face - simplified, no keypad */}
          <div className="p5-phantom-face">
            {/* top speaker / header */}
            <div className="p5-phantom-speaker">— — —</div>

            {/* big message area */}
            <div className="p5-phantom-screen">
              <div className="p5-phantom-message">
                有许愿、<span className="ransom-hot">建议</span>、一起共创、加入社群？<span className="ransom-chip">来信告诉我</span>
              </div>
            </div>

            {/* bottom 发送 button only */}
            <div className="p5-phantom-send">
              <span className="ransom-hot">发送</span>
            </div>
          </div>
        </div>
      </div>

      {/* 微信二维码弹窗 - matches your screenshot exactly (P5 red/black, dotted, WECHAT banner, white QR frame) */}
      {showQR && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100]"
          onClick={() => setShowQR(false)}
        >
          <div
            className="qr-modal relative mx-4 w-full max-w-[310px] border-[7px] border-[#e61e32] bg-[#0a0a0a] p-4 pb-5 shadow-[12px_12px_0_#000] overflow-hidden"
            style={{ clipPath: 'polygon(0 3%, 5% 0, 16% 4%, 27% 0, 40% 3%, 53% 0, 66% 4%, 78% 1%, 92% 3%, 100% 7%, 100% 19%, 97% 27%, 100% 36%, 96% 45%, 100% 54%, 97% 62%, 100% 71%, 96% 80%, 100% 88%, 96% 97%, 79% 94%, 63% 100%, 46% 95%, 31% 100%, 15% 96%, 3% 100%, 0 90%)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* red WECHAT banner */}
            <div className="mx-auto mb-3 inline-flex -skew-x-6 items-center border-[2px] border-[#e61e32] bg-[#e61e32] px-4 py-[1px]">
              <span className="font-display text-[11px] font-black tracking-[2.5px] text-white">WECHAT</span>
            </div>

            {/* dotted black QR area with white frame + inner white square for the code */}
            <div className="mx-auto relative w-[248px] border-[5px] border-[#f5f5f5] bg-[#111] p-3 overflow-hidden"
                 style={{ backgroundImage: 'radial-gradient(circle, rgba(245,245,245,0.95) 0.8px, transparent 1.2px)', backgroundSize: '3.4px 3.4px' }}>
              <div className="relative mx-auto w-[210px] h-[210px] bg-white border-[4px] border-[#111] overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/wechat-qr.jpg"
                  alt="微信二维码"
                  className="w-[190px] h-[190px] object-contain"
                  onError={(e) => {
                    e.target.outerHTML = '<div style="width:170px;height:170px;background:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative"><div style="color:#e61e32;font:900 10px Impact, Arial Black, sans-serif;letter-spacing:1.5px;margin-bottom:4px;">YOUR QR</div><div style="width:122px;height:122px;background:#fff;display:grid;grid-template-columns:repeat(6,1fr);gap:2px;padding:4px;border:3px solid #111"><span style="background:#111"></span><span></span><span style="background:#111"></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span></span><span style="background:#111"></span><span style="background:#111"></span><span></span><span style="background:#111"></span></div></div>';
                  }}
                />
                {/* subtle halftone overlay on real image */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 0.6px, transparent 1px)', backgroundSize: '2.8px 2.8px' }} />
              </div>
            </div>

            {/* texts exactly as screenshot */}
            <div className="mt-3 text-center">
              <div className="text-[15px] font-black tracking-wider text-[#f5f5f5]">扫码添加微信</div>
              <div className="mt-0.5 text-xs text-[#c0c0c0]">Kathy · 香港</div>
            </div>

            {/* big red close button */}
            <button
              onClick={() => setShowQR(false)}
              className="mt-4 block w-full border-[3px] border-[#f5f5f5] bg-[#e61e32] py-2.5 text-[14px] font-black tracking-[1px] text-white active:translate-y-px"
            >
              关闭 ×
            </button>

            {/* bottom wave accent */}
            <div className="absolute -bottom-1 left-0 right-0 h-2.5 opacity-70" style={{ background: 'repeating-linear-gradient(92deg, transparent 0 2px, #e61e32 2px 4px, transparent 4px 7px)' }} />
          </div>
        </div>
      )}
    </>
  );
}
