import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from './i18n.jsx';
import { THEME_LYRIC_LINES, getLyricWindow } from './themeLyrics.js';

const THEME_SONG_ID = '3400718129';
const THEME_AUDIO_URL = `https://music.163.com/song/media/outer/url?id=${THEME_SONG_ID}.mp3`;
const WECHAT_ID = 'kathyyxu';

const ThemeMusicContext = createContext(null);

export function useThemeMusic() {
  const ctx = useContext(ThemeMusicContext);
  if (!ctx) throw new Error('useThemeMusic must be used within ThemeMusicProvider');
  return ctx;
}

export function ThemeMusicProvider({ children }) {
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const audio = new Audio(THEME_AUDIO_URL);
    audio.preload = 'metadata';
    audio.loop = true;
    audioRef.current = audio;

    const onEnded = () => setPlaying(false);
    const onError = () => setAudioError(true);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      audio.pause();
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audioRef.current = null;
    };
  }, []);

  // 播放时用 rAF 平滑刷新进度，保证歌词同步更跟手
  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(rafRef.current);
      return undefined;
    }
    const tick = () => {
      const audio = audioRef.current;
      if (audio) setCurrentTime(audio.currentTime || 0);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const toggle = useCallback(async (event) => {
    event?.stopPropagation?.();
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      setAudioError(false);
    } catch {
      setAudioError(true);
      window.open(`https://music.163.com/#/song?id=${THEME_SONG_ID}`, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const lyricWindow = useMemo(
    () => getLyricWindow(THEME_LYRIC_LINES, currentTime),
    [currentTime],
  );

  const value = useMemo(
    () => ({
      playing,
      audioError,
      toggle,
      wechatId: WECHAT_ID,
      currentTime,
      lyricWindow,
    }),
    [playing, audioError, toggle, currentTime, lyricWindow],
  );

  return <ThemeMusicContext.Provider value={value}>{children}</ThemeMusicContext.Provider>;
}

function ContactModal({ open, onClose, language }) {
  const [copied, setCopied] = useState(false);
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <div
        className="qr-modal relative mx-4 w-full max-w-[320px] border-[7px] border-[#e61e32] bg-[#0a0a0a] p-5 shadow-[12px_12px_0_#000] overflow-hidden"
        style={{
          clipPath:
            'polygon(0 3%, 5% 0, 16% 4%, 27% 0, 40% 3%, 53% 0, 66% 4%, 78% 1%, 92% 3%, 100% 7%, 100% 19%, 97% 27%, 100% 36%, 96% 45%, 100% 54%, 97% 62%, 100% 71%, 96% 80%, 100% 88%, 96% 97%, 79% 94%, 63% 100%, 46% 95%, 31% 100%, 15% 96%, 3% 100%, 0 90%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 inline-flex -skew-x-6 items-center border-[2px] border-[#e61e32] bg-[#e61e32] px-4 py-[1px]">
          <span className="font-display text-[11px] font-black tracking-[2.5px] text-white">
            {language === 'en' ? 'Contact Developer' : '联络开发者'}
          </span>
        </div>

        <div className="text-center py-4">
          <p className="text-[#f5f5f5] text-base mb-4">
            {language === 'en'
              ? `Contact Developer, WeChat ID: ${WECHAT_ID}`
              : `联络开发者，微信ID：${WECHAT_ID}`}
          </p>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(WECHAT_ID).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              });
            }}
            className="w-full border-[3px] border-[#f5f5f5] bg-[#e61e32] py-2.5 text-[14px] font-black tracking-[1px] text-white active:translate-y-px mb-3"
          >
            {copied
              ? language === 'en'
                ? 'Copied!'
                : '已复制！'
              : language === 'en'
                ? 'Copy to clipboard'
                : '一键复制到剪贴板'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full border-[3px] border-[#f5f5f5] bg-transparent py-2 text-sm font-black tracking-[1px] text-white"
          >
            {language === 'en' ? 'Close' : '关闭'}
          </button>
        </div>

        <div
          className="absolute -bottom-1 left-0 right-0 h-2.5 opacity-70"
          style={{
            background:
              'repeating-linear-gradient(92deg, transparent 0 2px, #e61e32 2px 4px, transparent 4px 7px)',
          }}
        />
      </div>
    </div>
  );
}

/** 全局右下角主题曲手机：全站常驻，切换页面不中断播放 */
export function ThemePhone() {
  const location = useLocation();
  const { language, get } = useI18n();
  const { playing, audioError, toggle, lyricWindow, currentTime } = useThemeMusic();
  const [showContact, setShowContact] = useState(false);

  const path = location.pathname;
  // 仅线下共学保留双栏（联络内容 + 播放）；强女的故事与其它页一样显示歌词手机
  const isDual = path === '/offline';

  const offlineData = get('offline', {}) || {};
  const dualConfig = useMemo(() => {
    if (path === '/offline') {
      return {
        message:
          offlineData.phoneMessage ||
          '有许愿、建议、<br /><span class="ransom-hot">想要一起共创</span>、加入社群？<br /><span class="ransom-chip">来信告诉我</span>',
        sendLabel: offlineData.phoneSend || (language === 'en' ? 'Send' : '发送'),
        title: language === 'en' ? 'Contact / Theme song' : '联络 / 主题曲',
      };
    }
    return null;
  }, [path, offlineData.phoneMessage, offlineData.phoneSend, language]);

  // 切页时关掉联系弹窗，音乐状态保留在 Provider
  useEffect(() => {
    setShowContact(false);
  }, [path]);

  if (isDual && dualConfig) {
    return (
      <>
        <div
          className="p5-phone p5-phantom-phone p5-fixed p5-dual-phone"
          title={dualConfig.title}
          aria-label={dualConfig.title}
        >
          <div className="p5-phone-outer phantom-letter-paper">
            <span className="phantom-tape phantom-tape-left" aria-hidden="true" />
            <span className="phantom-tape phantom-tape-right" aria-hidden="true" />
            <div className="p5-phantom-red-slice" aria-hidden="true" />

            <div className="p5-phantom-face p5-dual-face">
              <div className="p5-phantom-speaker">
                <span className="p5-phone-cam"></span>
                — — —
              </div>

              {/* 上一行：页面原有内容 */}
              <button
                type="button"
                className="p5-dual-top"
                onClick={() => setShowContact(true)}
                title={language === 'en' ? 'Open contact' : '打开联络'}
              >
                <div className="p5-phantom-screen p5-dual-screen">
                  <div
                    className="p5-phantom-message p5-dual-message"
                    dangerouslySetInnerHTML={{ __html: dualConfig.message }}
                  />
                </div>
                <div className="p5-phantom-send p5-dual-send-label">
                  <span className="ransom-hot">{dualConfig.sendLabel}</span>
                </div>
              </button>

              {/* 下一行：主题曲播放/暂停 */}
              <button
                type="button"
                className="p5-phantom-send p5-music-toggle p5-dual-music"
                onClick={toggle}
                aria-pressed={playing}
                title={language === 'en' ? 'Theme song play/pause' : '主题曲 播放/暂停'}
              >
                <span className="ransom-hot">
                  {playing
                    ? language === 'en'
                      ? '♪ Pause'
                      : '♪ 暂停'
                    : language === 'en'
                      ? '♪ Play'
                      : '♪ 播放'}
                </span>
              </button>
            </div>
          </div>
        </div>
        <ContactModal open={showContact} onClose={() => setShowContact(false)} language={language} />
      </>
    );
  }

  // 其他页面：主题曲手机 + 同步歌词
  const idleTitle = language === 'en' ? 'Woman Up Theme' : 'Woman Up 主题曲';
  // 未播放且仍在开头：显示品牌标题；播放中或进度前进：显示同步歌词
  const showLyricMode = playing || currentTime > 0.8;

  return (
    <div
      className="p5-phone p5-phantom-phone p5-fixed p5-music-phone"
      title={language === 'en' ? 'Woman Up theme · play/pause' : 'Woman Up 主题曲 · 播放/暂停'}
      aria-label={language === 'en' ? 'Theme song player' : '主题曲播放器'}
    >
      <div className="p5-phone-outer phantom-letter-paper">
        <span className="phantom-tape phantom-tape-left" aria-hidden="true" />
        <span className="phantom-tape phantom-tape-right" aria-hidden="true" />
        <div className="p5-phantom-red-slice" aria-hidden="true" />

        <div className="p5-phantom-face">
          <div className="p5-phantom-speaker">
            <span className="p5-phone-cam"></span>
            — — —
          </div>

          <div className="p5-phantom-screen p5-music-screen p5-lyric-screen">
            {!showLyricMode ? (
              <div
                className="p5-phantom-message"
                dangerouslySetInnerHTML={{
                  __html: `<span class="ransom-chip">Woman Up</span><br /><span class="ransom-hot">主题曲</span>`,
                }}
              />
            ) : (
              <div className="p5-lyric-box" aria-live="polite">
                {lyricWindow.prev ? (
                  <p className="p5-lyric-prev">{lyricWindow.prev}</p>
                ) : (
                  <p className="p5-lyric-prev p5-lyric-spacer">&nbsp;</p>
                )}
                <p className="p5-lyric-current">{lyricWindow.current || idleTitle}</p>
                {lyricWindow.next ? (
                  <p className="p5-lyric-next">{lyricWindow.next}</p>
                ) : (
                  <p className="p5-lyric-next p5-lyric-spacer">&nbsp;</p>
                )}
              </div>
            )}
            {audioError ? (
              <p className="p5-music-hint">{language === 'en' ? 'Tap to open NetEase' : '若无声，点按打开网易云'}</p>
            ) : null}
            {playing ? (
              <p className="p5-music-hint p5-lyric-badge">♪ LIVE</p>
            ) : null}
          </div>

          <button
            type="button"
            className="p5-phantom-send p5-music-toggle"
            onClick={toggle}
            aria-pressed={playing}
          >
            <span className="ransom-hot">{playing ? (language === 'en' ? 'Pause' : '暂停') : language === 'en' ? 'Play' : '播放'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
