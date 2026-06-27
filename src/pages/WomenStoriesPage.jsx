import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ActionButton, BrutalCard, SlashTitle } from '../components.jsx';
import { historicalWomenStories } from '../data.js';
import { useI18n } from '../i18n.jsx';

export default function WomenStoriesPage() {
  const navigate = useNavigate();
  const { t, get, language } = useI18n();
  const stories = get('womenStories') || historicalWomenStories;

  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);

  const phoneMessage = '<span class="ransom-chip">投稿</span>我心目中的<br /><span class="ransom-hot">强女</span>';
  const phoneSend = '发送';

  return (
    <>
      <SlashTitle eyebrow="WOMEN WHO FOUGHT" title={t('guide.storiesTitle')} subtitle={t('guide.storiesSubtitle')} />

      <div className="grid gap-3">
        {stories.map((person) => (
          <BrutalCard key={person.name} dark>
            <p className="text-xs font-black uppercase text-blood">{person.era}</p>
            <h2 className="font-display text-4xl uppercase leading-none text-paper">{person.name}</h2>
            <p className="mt-2 border-l-8 border-blood pl-3 text-xl font-black text-paper">{person.title}</p>
            <p className="mt-3 text-sm font-bold text-ash">{person.story}</p>
            <p className="mt-3 bg-paper p-3 text-sm font-black text-void">{t('guide.lesson', { lesson: person.lesson })}</p>
          </BrutalCard>
        ))}
      </div>

      <ActionButton className="mt-5 w-full" onClick={() => navigate('/elevator-test')}>
        {t('guide.enterElevator')}
        <ArrowRight size={18} strokeWidth={3} />
      </ActionButton>

      {/* 匿名信风格手机 - 投稿强女 */}
      <div
        onClick={() => setShowContact(true)}
        className="p5-phone p5-phantom-phone p5-fixed cursor-pointer"
        title="点击投稿"
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

      {/* 联络开发者弹窗 - 复制微信 ID */}
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
              <span className="font-display text-[11px] font-black tracking-[2.5px] text-white">
                {language === 'en' ? 'Contact Developer' : '联络开发者'}
              </span>
            </div>

            <div className="text-center py-4">
              <p className="text-[#f5f5f5] text-base mb-4">
                {language === 'en' ? 'Contact Developer, WeChat ID: kathyyxu' : '联络开发者，微信ID：kathyyxu'}
              </p>

              <button
                onClick={() => {
                  navigator.clipboard.writeText('kathyyxu').then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  });
                }}
                className="w-full border-[3px] border-[#f5f5f5] bg-[#e61e32] py-2.5 text-[14px] font-black tracking-[1px] text-white active:translate-y-px mb-3"
              >
                {copied ? (language === 'en' ? 'Copied!' : '已复制！') : (language === 'en' ? 'Copy to clipboard' : '一键复制到剪贴板')}
              </button>

              <button
                onClick={() => setShowContact(false)}
                className="w-full border-[3px] border-[#f5f5f5] bg-transparent py-2 text-sm font-black tracking-[1px] text-white"
              >
                {language === 'en' ? 'Close' : '关闭'}
              </button>
            </div>

            {/* bottom wave accent */}
            <div className="absolute -bottom-1 left-0 right-0 h-2.5 opacity-70" style={{ background: 'repeating-linear-gradient(92deg, transparent 0 2px, #e61e32 2px 4px, transparent 4px 7px)' }} />
          </div>
        </div>
      )}
    </>
  );
}
