import { SlashTitle, BrutalCard } from '../components.jsx';
import { useI18n } from '../i18n.jsx';
import { useState, useEffect } from 'react';

export default function OfflineCoLearnPage() {
  const { get, language } = useI18n();
  const [wishes, setWishes] = useState({ '01':0,'02':0,'03':0,'04':0,'05':0,'06':0,'07':0,'08':0,'09':0 });
  const darkTextNums = new Set(['01', '03', '04', '06', '07', '09']);

  useEffect(() => {
    const loadWishes = () => {
      fetch('/api/wishes')
        .then(r => r.json())
        .then(data => setWishes(data || { '01':0,'02':0,'03':0,'04':0,'05':0,'06':0,'07':0,'08':0,'09':0 }))
        .catch(() => {});
    };
    loadWishes();
    // Poll every 8s so other devices see updates quickly
    const iv = setInterval(loadWishes, 8000);
    return () => clearInterval(iv);
  }, []);

  const handleWish = async (num) => {
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num })
      });
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      } else {
        // fallback local if API fails
        setWishes((prev) => ({ ...prev, [num]: (prev[num] || 0) + 1 }));
      }
    } catch (e) {
      // fallback
      setWishes((prev) => ({ ...prev, [num]: (prev[num] || 0) + 1 }));
    }
  };

  let offlineData = get('offline', {});
  let modulesData = offlineData.modules || [];
  const wishText = language === 'en' ? '🔥 Wish' : '🔥 许愿';
  const wishStat = (n) => language === 'en' ? `${n} wished` : `已有${n}人许愿`;

  if (language === 'en') {
    offlineData = {
      eyebrow: 'OFFLINE CO-LEARN',
      title: 'Offline Co-learning Wish Pool',
      subtitle: '9 Offline Course System · Modular Practical Co-learning (Gradually Rolling Out)',
      intro: 'Your wish will directly decide which one lands first. The course with the most wishes will be prioritized for trial classes.',
    };
    modulesData = [
      {
        id: 'module1',
        title: 'Module 1: Boundary Rebuilding',
        desc: 'Rebuild personal boundaries and confidence through a combination of debate and jiu-jitsu.',
        courses: [
          {
            num: '01',
            title: 'Debate · Jiu-Jitsu',
            icon: '🗣️🥋',
            desc: 'Combine debate persuasion with Brazilian jiu-jitsu ground techniques to strengthen dual boundary awareness in language and body. Suitable for quickly rebuilding a sense of control during low energy.',
          },
        ],
      },
      {
        id: 'module2',
        title: 'Module 2: Combat Series',
        desc: 'Simulate survival and counterattack skills in real environments.',
        courses: [
          {
            num: '02',
            title: 'Car Interior Jiu-Jitsu / Prop Jiu-Jitsu',
            icon: '🚗🥋',
            desc: 'Escape and counter jiu-jitsu for small car interiors, practicing staying calm and effective movements in restricted environments. Use props to simulate street combat of disarming weapons.',
          },
          {
            num: '03',
            title: 'Dirty Self-Defense Techniques',
            icon: '👊💥',
            desc: 'Unconventional self-protection moves in real high-risk scenarios, prioritizing survival, creating opportunities to escape or seek help.',
          },
          {
            num: '04',
            title: 'Fist Class',
            icon: '🥊🌲',
            desc: 'Combat basics and physical integration training in natural environments, improving adaptability in the wild.',
          },
          {
            num: '05',
            title: 'Weapon Sparring',
            icon: '⚔️🛡️',
            desc: 'Safe foam sword and weapon sparring, training distance judgment, timing, and safe counterattack awareness.',
          },
          {
            num: '06',
            title: 'Philippine Short Stick',
            icon: '🥢📏',
            desc: 'Basic Philippine martial arts short stick, mastering distance management and improvised weapon conversion, improving sense of defensive distance.',
          },
        ],
      },
      {
        id: 'module3',
        title: 'Module 3: Real Scenario Survival',
        desc: 'Combat fitness and practical cycles in real environments.',
        courses: [
          {
            num: '07',
            title: 'Core Fitness',
            icon: '🏃‍♀️🌿',
            desc: 'Core strength, endurance, and stability training to build the physical foundation needed for wilderness survival.',
          },
          {
            num: '08',
            title: 'Combat Fitness Cycle',
            icon: '🏋️‍♂️🔄',
            desc: 'Cycle training combining combat movements to improve explosiveness, recovery, and practical endurance.',
          },
          {
            num: '09',
            title: 'Parkour · Urban Escape',
            icon: '🏃‍♂️🏙️',
            desc: 'Parkour mobility and urban environment escape techniques, enhancing quick movement and escape ability in complex cities.',
          },
        ],
      },
    ];
  }

  return (
    <>
      <SlashTitle
        eyebrow={offlineData.eyebrow || "OFFLINE CO-LEARN"}
        title={offlineData.title || "线下共学许愿池"}
      />

      {/* 副标题 + 许愿说明 - 匿名信风格 */}
      <div className="phantom-letter-wrap mt-2 mb-4">
        <article className="phantom-letter" style={{ paddingRight: '1rem' }}>
          <div className="phantom-letter-paper" style={{ display: 'block' }}>
            <span className="phantom-tape phantom-tape-left" aria-hidden="true" />
            <span className="phantom-tape phantom-tape-right" aria-hidden="true" />
            <div className="phantom-letter-callout" style={{ width: '100%' }}>
              <p className="phantom-letter-line" style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                {offlineData.subtitle || '9门线下课程体系 · 模块化实战共学（逐步上线中）'}
              </p>
              <p className="phantom-letter-line text-xs leading-snug" style={{ width: '100%' }}>
                {offlineData.intro || '你的许愿会直接决定哪一门先落地。许愿最高的课，会优先排期试课。'}
              </p>
            </div>
          </div>
        </article>
      </div>

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
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleWish(course.num)}
                      className="border border-[#e61e32] text-[#e61e32] px-2 py-0.5 rounded hover:bg-[#e61e32] hover:text-white transition"
                    >
                      {wishText}
                    </button>
                    <span className="text-ash">{wishStat(wishes[course.num] || 0)}</span>
                  </div>
                </BrutalCard>
              );
            })}
          </div>
        </div>
      ))}



      <p className="text-sm text-ash mt-4">当许愿达到50人时，我们会启动筹备，并公布课程时间和价格。</p>

      {/* 开发者的信 - 首页匿名信风格 (初始版本) */}
      <div className="mt-4 phantom-letter-wrap">
        <article className="phantom-letter" style={{paddingRight: '1rem'}}>
          <div className="phantom-letter-paper" style={{display: 'block'}}>
            <span className="phantom-tape phantom-tape-left" aria-hidden="true" />
            <span className="phantom-tape phantom-tape-right" aria-hidden="true" />
            <div className="phantom-letter-callout" style={{width: '100%'}}>
              <p className="phantom-letter-motto" style={{fontSize: '0.85em'}}>开发者的信</p>
              <p className="phantom-letter-line text-xs leading-snug" style={{width: '100%'}}>这些课程还在构思中。每门课从想法到落地，需要场地、教练、安全设备和时间。许愿最高的课程会优先筹备，欢迎有兴趣的朋友一起加入共创和讨论</p>
            </div>
          </div>
        </article>
      </div>

    </>
  );
}
