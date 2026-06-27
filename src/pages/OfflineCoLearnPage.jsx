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

      {/* Persona 5 style phone - fixed bottom right, high-contrast red/black, jagged, halftone, comic grid, splashes, waves */}
      <div
        onClick={() => setShowQR(true)}
        className="p5-phone fixed bottom-[76px] right-3 cursor-pointer"
        title="点击查看微信二维码"
      >
        <div className="p5-phone-outer">
          {/* comic grid overlay */}
          <div className="p5-phone-grid" />

          {/* liquid splashes */}
          <div className="p5-phone-splash p5-phone-splash1" />
          <div className="p5-phone-splash p5-phone-splash2" />

          {/* cracks / shattered glass */}
          <div className="p5-phone-crack p5-phone-crack1" />
          <div className="p5-phone-crack p5-phone-crack2" />
          <div className="p5-phone-crack p5-phone-crack3" />

          {/* ukiyo-e wave */}
          <div className="p5-phone-wave" />

          <div className="p5-phone-bezel">
            <div className="p5-phone-speaker" />
            <div className="p5-phone-screen">
              <div className="p5-phone-text">
                有许愿、建议、<br />
                一起共创、加入社群？<br />
                欢迎来信
              </div>
            </div>
            <div className="p5-phone-home" />
          </div>
        </div>
      </div>

      {/* 微信二维码弹窗 - Persona 5 violent aesthetic */}
      {showQR && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100]"
          onClick={() => setShowQR(false)}
        >
          <div
            className="relative mx-4 w-full max-w-[300px] border-[6px] border-[#e61e32] bg-[#111] p-5 shadow-[10px_10px_0_#000] overflow-hidden"
            style={{ clipPath: 'polygon(0 4%, 6% 0, 18% 3%, 29% 0, 41% 5%, 55% 1%, 68% 4%, 82% 0, 94% 3%, 100% 6%, 100% 22%, 97% 31%, 100% 39%, 96% 48%, 100% 56%, 95% 65%, 100% 74%, 96% 83%, 100% 91%, 96% 100%, 79% 97%, 63% 100%, 47% 95%, 33% 100%, 17% 96%, 4% 100%, 0 93%)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* red splash header accent */}
            <div className="absolute -top-3 -right-2 w-16 h-8 bg-[#e61e32] rotate-12" style={{clipPath:'polygon(10% 0,100% 0,100% 70%,40% 100%,0 60%)'}} />

            <div className="text-center">
              <div className="mb-2 inline-block -skew-x-6 border-2 border-[#e61e32] bg-[#e61e32] px-2 py-0.5 font-display text-xs text-paper tracking-[2px]">WECHAT</div>
              <div className="relative mx-auto w-64 h-64 border-[5px] border-[#f5f5f5] bg-black overflow-hidden shadow-inner" style={{boxShadow:'inset 0 0 0 3px #000'}}>
                <img
                  src="/assets/wechat-qr.jpg"
                  alt="微信二维码"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.outerHTML = '<div class="w-full h-full bg-[#1a1a1a] flex flex-col items-center justify-center text-[10px] text-[#f5f5f5] font-bold leading-tight p-2">请将微信二维码<br/>放到<br/>public/assets/wechat-qr.jpg<br/><span class="text-[8px] opacity-60 mt-1">扫码加入社群</span></div>';
                  }}
                />
                {/* overlay halftone + crack on qr */}
                <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(circle,#fff 0.6px,transparent 1px)', backgroundSize:'3px 3px', opacity:0.15}} />
              </div>
              <p className="mt-3 text-sm font-black text-paper tracking-wider">扫码添加微信</p>
              <p className="text-[10px] text-ash mt-0.5">Kathy · 香港</p>
            </div>

            <button
              onClick={() => setShowQR(false)}
              className="mt-4 w-full border-3 border-paper bg-[#e61e32] py-2 text-sm font-black tracking-[1px] text-paper active:translate-y-px"
            >
              关闭 ×
            </button>

            {/* small wave bottom accent */}
            <div className="absolute -bottom-1 left-0 right-0 h-3 bg-repeat-x" style={{background:'repeating-linear-gradient(95deg,transparent 0 2px,#e61e32 2px 4px,transparent 4px 7px)'}} />
          </div>
        </div>
      )}
    </>
  );
}
