import { SlashTitle, BrutalCard } from '../components.jsx';
import { useI18n } from '../i18n.jsx';

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

    </>
  );
}
