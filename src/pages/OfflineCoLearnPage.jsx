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
  const { t, get } = useI18n();
  const [showContact, setShowContact] = useState(false);
  const [wechatId, setWechatId] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const darkTextNums = new Set(['01', '03', '04', '06', '07', '09']);

  const offlineData = get('offline', {});
  const modulesData = offlineData.modules || [];
  const phoneMessage = offlineData.phoneMessage || '';
  const phoneSend = offlineData.phoneSend || '发送';
  const contactData = offlineData.contact || {};

  return (
    <>
      <SlashTitle
        eyebrow={offlineData.eyebrow || "OFFLINE CO-LEARN"}
        title={offlineData.title || "线下共学"}
        subtitle={offlineData.subtitle || "9门线下课程体系 · 模块化实战共学（逐步上线中）"}
      />

      {modulesData.map((mod) => (
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
        onClick={() => {
          setShowContact(true);
          setContactSent(false);
          setWechatId('');
          setContactMsg('');
        }}
        className="p5-phone p5-phantom-phone fixed bottom-[55px] right-4 cursor-pointer"
        title={t('offline.contact.title') || '点击发送消息'}
      >
        <div className="p5-phone-outer phantom-letter-paper">
          {/* tapes like homepage anonymous letter */}
          <span className="phantom-tape phantom-tape-left" aria-hidden="true" />
          <span className="phantom-tape phantom-tape-right" aria-hidden="true" />

          {/* red/black accent slices for P5 strength */}
          <div className="p5-phantom-red-slice" aria-hidden="true" />

          {/* inner phone face - simplified, no keypad */}
          <div className="p5-phantom-face">
            {/* top speaker / header - more phone-like */}
            <div className="p5-phantom-speaker">
              <span className="p5-phone-cam"></span>
              — — —
            </div>

            {/* big message area - fills the phone */}
            <div className="p5-phantom-screen">
              <div className="p5-phantom-message" dangerouslySetInnerHTML={{ __html: phoneMessage }} />
            </div>

            {/* bottom 发送 button only */}
            <div className="p5-phantom-send">
              <span className="ransom-hot">{phoneSend}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 邮件联系弹窗 - 发邮件模式 */}
      {showContact && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100]"
          onClick={() => setShowContact(false)}
        >
          <div
            className="qr-modal relative mx-4 w-full max-w-[320px] border-[7px] border-[#e61e32] bg-[#0a0a0a] p-5 shadow-[12px_12px_0_#000] overflow-hidden"
            style={{ clipPath: 'polygon(0 3%, 5% 0, 16% 4%, 27% 0, 40% 3%, 53% 0, 66% 4%, 78% 1%, 92% 3%, 100% 7%, 100% 19%, 97% 27%, 100% 36%, 96% 45%, 100% 54%, 97% 62%, 100% 71%, 96% 80%, 100% 88%, 96% 97%, 79% 94%, 63% 100%, 46% 95%, 31% 100%, 15% 96%, 3% 100%, 0 90%)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* banner */}
            <div className="mx-auto mb-4 inline-flex -skew-x-6 items-center border-[2px] border-[#e61e32] bg-[#e61e32] px-4 py-[1px]">
              <span className="font-display text-[11px] font-black tracking-[2.5px] text-white">{contactData.title || '来信告诉我'}</span>
            </div>

            {!contactSent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!wechatId.trim()) {
                    alert(contactData.missingId || '请填写你的微信ID');
                    return;
                  }
                  const subject = encodeURIComponent(`Woman Up / 线下共学 来信 - ${wechatId}`);
                  const body = encodeURIComponent(
                    `微信ID: ${wechatId}\n\n消息 / 许愿 / 建议:\n${contactMsg || '（无附加消息）'}\n\n—— 来自 womanup-fight.vercel.app/offline`
                  );
                  window.location.href = `mailto:math314s@gmail.com?subject=${subject}&body=${body}`;
                  setContactSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs text-[#c0c0c0] mb-1 font-black tracking-wider">{contactData.wechatLabel || '你的微信ID *'} <span className="text-[#e61e32]">*</span></label>
                  <input
                    type="text"
                    value={wechatId}
                    onChange={(e) => setWechatId(e.target.value)}
                    required
                    placeholder={contactData.wechatPlaceholder || '微信号 / ID'}
                    className="w-full bg-[#111] border-2 border-[#f5f5f5] text-[#f5f5f5] p-2 text-sm font-bold focus:outline-none focus:border-[#e61e32]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#c0c0c0] mb-1 font-black tracking-wider">{contactData.msgLabel || '消息 / 许愿 / 建议（可选）'}</label>
                  <textarea
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    rows={4}
                    placeholder={contactData.msgPlaceholder || '想说的话...'}
                    className="w-full bg-[#111] border-2 border-[#f5f5f5] text-[#f5f5f5] p-2 text-sm font-bold resize-y focus:outline-none focus:border-[#e61e32]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border-[3px] border-[#f5f5f5] bg-[#e61e32] py-2.5 text-[14px] font-black tracking-[1px] text-white active:translate-y-px"
                >
                  {contactData.submit || '发送邮件到 math314s@gmail.com'}
                </button>

                <p className="text-[10px] text-center text-[#666]">{contactData.note || '提交后会打开你的邮件客户端，请确认发送。'}</p>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="text-[#f5f5f5] text-lg font-black mb-2">{contactData.thanks || '谢谢！'}</div>
                <p className="text-sm text-[#c0c0c0] mb-4" dangerouslySetInnerHTML={{ __html: contactData.sent || '邮件客户端已打开，请在邮箱中发送你的消息。<br />我会尽快通过微信联系你。' }} />
                <button
                  onClick={() => setShowContact(false)}
                  className="w-full border-[3px] border-[#f5f5f5] bg-[#e61e32] py-2 text-sm font-black tracking-[1px] text-white"
                >
                  {contactData.close || '关闭'}
                </button>
              </div>
            )}

            {/* bottom wave accent */}
            <div className="absolute -bottom-1 left-0 right-0 h-2.5 opacity-70" style={{ background: 'repeating-linear-gradient(92deg, transparent 0 2px, #e61e32 2px 4px, transparent 4px 7px)' }} />
          </div>
        </div>
      )}
    </>
  );
}
