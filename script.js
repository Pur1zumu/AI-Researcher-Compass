// AI Researcher Personality Assessment - Main Script
// All questions and personality data extracted from DOCUMENTS.md

class AIResearcherAssessment {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.shuffledQuestions = [];
        this.dimensions = {
            horizon: [], // 科研坐标 (F vs A)
            paradigm: [], // 认知范式 (P vs E) 
            lever: [], // 增长杠杆 (M vs D)
            strategy: [] // 创新策略 (R vs I)
        };
        
        // Debug mode variables
        this.debugKeySequence = [];
        this.debugKeyTarget = ['d', 'e', 'b', 'u', 'g']; // Press D-E-B-U-G to activate debug mode
        
        this.initializeQuestions();
        this.initializePersonalities();
        this.bindEvents();
        this.bindDebugEvents();
    }

    initializeQuestions() {
        // Dimension 1: Research Horizon (科研坐标)
        const horizonQuestions = [
            {
                dimension: 'horizon',
                question: '在选择一个新课题时，哪种情况更能点燃你的热情？',
                optionA: '探索一个尚无公认范式、需要从零构建评测体系的AI新方向。',
                optionB: '在一个有明确评估标准的赛道上，解决一个关键的现实难题。'
            },
            {
                dimension: 'horizon',
                question: '你认为更有价值的科研遗产是？',
                optionA: '提出一个极具启发性的全新概念，为领域开辟了新的探索路径。',
                optionB: '打造一个被广泛采用的高效系统，显著提升了任务解决效率。'
            },
            {
                dimension: 'horizon',
                question: '在规划你的博士生涯时，你更倾向于？',
                optionA: '追随一个宏大而长远的目标，接受毕业前产出不确定的风险。',
                optionB: '将课题分解为一系列目标明确的子项目，确保每年都有稳定产出。'
            },
            {
                dimension: 'horizon',
                question: '什么样的成果更能给你带来成就感？',
                optionA: '你的论文因其思想的颠覆性，在十年后依然被人们讨论和引用。',
                optionB: '你的代码库在GitHub上获得数千星标，并被集成到主流框架中。'
            },
            {
                dimension: 'horizon',
                question: '你更享受科研的哪个阶段？',
                optionA: '项目初期，自由探索不同领域的交叉思想，构思一个全新的解题框架。',
                optionB: '项目后期，围绕明确的性能指标进行精细调优，享受数字稳步提升的快乐。'
            },
            {
                dimension: 'horizon',
                question: '在顶级会议上，你更愿意花时间听哪类报告？',
                optionA: '探讨AI未来方向与社会影响的"大图景"主题演讲 (Keynote)。',
                optionB: '深入剖析某个具体任务最前沿技术的论文分享 (Oral)。'
            },
            {
                dimension: 'horizon',
                question: '你认为什么样的导师更值得追随？',
                optionA: '一位思想深邃的"哲学家"，能引导你思考领域的终极问题。',
                optionB: '一位人脉广博的"实干家"，能为你对接前沿的工业界资源。'
            },
            {
                dimension: 'horizon',
                question: '你定义"科研影响力"的方式更接近？',
                optionA: '思想的传播范围和持久度，即"启发了多少人"。',
                optionB: '技术的应用广度和深度，即"帮助了多少人"。'
            },
            {
                dimension: 'horizon',
                question: '如果让你负责一笔科研经费，你会优先投给？',
                optionA: '支持通用人工智能（AGI）基础理论的探索性项目。',
                optionB: '资助利用现有AI技术解决具体社会问题的应用项目。'
            },
            {
                dimension: 'horizon',
                question: '阅读文献时，哪种类型的论文更让你兴奋？',
                optionA: '提出一个全新任务或评估维度的"开山之作" (Position Paper)。',
                optionB: '在一个竞争激烈的榜单上取得第一名的"屠榜之作" (SOTA Paper)。'
            }
        ];

        // Dimension 2: Cognitive Paradigm (认知范式)
        const paradigmQuestions = [
            {
                dimension: 'paradigm',
                question: '当一个新模型效果很好但机理不明时，你的好奇心更倾向于？',
                optionA: '"它为什么能行？"——我会优先去寻找或构建一个能解释其内在机理的框架。',
                optionB: '"它究竟能行多远？"——我会优先设计实验去量化其性能和应用边界。'
            },
            {
                dimension: 'paradigm',
                question: '你更倾向于哪种科研起点？',
                optionA: '从一个关于智能的根本性假设出发，设计模型来验证它。',
                optionB: '从一个有趣的数据集或现象出发，通过实验让解决方案"涌现"。'
            },
            {
                dimension: 'paradigm',
                question: '当实验结果与你的核心假设相悖时，你的第一反应是？',
                optionA: '倾向于首先审视实验的有效性，设计对照实验来排除潜在干扰。',
                optionB: '相信这是一个惊喜的发现，它揭示了认知盲点，并立即着手探索。'
            },
            {
                dimension: 'paradigm',
                question: '在评价一篇论文时，你认为它的"根基"在于？',
                optionA: '其核心思想的深度与启发性，以及逻辑框架的清晰度。',
                optionB: '其经验证据的坚实程度，包括实验的严谨性与可复现性。'
            },
            {
                dimension: 'paradigm',
                question: '当你进入一个陌生的AI子领域时，你倾向于如何"破冰"？',
                optionA: '先通读奠基性论文和综述，从宏观上理解领域的核心原理。',
                optionB: '先跑一个经典的开源项目，通过修改代码来快速建立直观感受。'
            },
            {
                dimension: 'paradigm',
                question: '你如何看待"Scaling Law"这类现象？',
                optionA: '它暗示了智能背后有根本原则，理解这个"为什么"更吸引我。',
                optionB: '它是一个强大的经验性杠杆，首要任务是利用它推动能力边界。'
            },
            {
                dimension: 'paradigm',
                question: '面对一个棘手的技术难题（如模型幻觉），你的思路更倾向于？',
                optionA: '从交叉学科中寻找原理性灵感，构建一个能根治问题的新框架。',
                optionB: '系统性地测试社区中各种经验性方案，通过实验迭代找到最优组合。'
            },
            {
                dimension: 'paradigm',
                question: '你眼中更"优雅"的AI研究是？',
                optionA: '提出一个简洁而深刻的概念（如"自监督学习"），能统一解释一系列问题。',
                optionB: '打造一个在多个基准上都表现出极强鲁棒性的系统。'
            },
            {
                dimension: 'paradigm',
                question: '在一次头脑风暴中，你更享受扮演什么样的角色？',
                optionA: '提出颠覆性的世界观或抽象框架，负责定义"为什么这么做"。',
                optionB: '提出可验证的实验路径和评估方案，负责定义"应该怎么做"。'
            },
            {
                dimension: 'paradigm',
                question: '在开源你的项目代码时，你的首要关注点是？',
                optionA: '代码的可读性和结构优雅性，确保它能清晰地反映论文的核心思想与抽象。',
                optionB: '一键复现脚本的完备性，确保他人能轻松跑通实验并验证论文里的关键数字。'
            }
        ];

        // Dimension 3: Growth Lever (增长杠杆)
        const leverQuestions = [
            {
                dimension: 'lever',
                question: '你认为以下哪句话更能描述AI领域的进步？',
                optionA: '真正的突破源于算法和模型架构的根本性创新。',
                optionB: '真正的突破源于数据质量、规模和多样性的持续提升。'
            },
            {
                dimension: 'lever',
                question: '如果一个项目效果未达预期，你会优先从哪个方向寻找解决方案？',
                optionA: '重新审视和设计模型结构，或尝试一种全新的算法范式。',
                optionB: '深入分析和清洗现有数据，或投入精力去获取更好的数据。'
            },
            {
                dimension: 'lever',
                question: '一个理想的科研团队，你认为其核心竞争力在于？',
                optionA: '拥有几位在模型设计上充满奇思妙想的天才。',
                optionB: '拥有一个高效严谨的数据工程流程和独家数据集。'
            },
            {
                dimension: 'lever',
                question: '在你的日常研究中，哪件事更能让你乐在其中？',
                optionA: '在白板或纸上构思、推演各种新颖的模型组件。',
                optionB: '编写脚本处理海量数据，并从中发现有趣规律。'
            },
            {
                dimension: 'lever',
                question: '展望未来，你更期待看到什么样的突破？',
                optionA: '一个像Transformer一样具有普适性的新一代基础模型诞生。',
                optionB: '一套能极大降低数据标注成本的自动化数据引擎问世。'
            },
            {
                dimension: 'lever',
                question: '如果项目预算有限，你倾向于将更多资源投入到哪个方面？',
                optionA: '租赁更多的GPU/TPU算力，以支持更复杂的模型训练。',
                optionB: '采购或标注更高质量的数据集，以提升模型的学习上限。'
            },
            {
                dimension: 'lever',
                question: '你认为一个AI创业公司更坚实的"护城河"是？',
                optionA: '一个难以复制的、性能卓越的专有模型。',
                optionB: '一个通过产品闭环持续积累的专有数据集。'
            },
            {
                dimension: 'lever',
                question: '如果让你招募一位新成员，你会优先选择？',
                optionA: '一位在算法和模型理论方面有很深造诣的青年科学家。',
                optionB: '一位在数据系统和工程方面经验丰富的工程师。'
            },
            {
                dimension: 'lever',
                question: '当一篇论文的核心贡献是新模型架构时，你的反应是？',
                optionA: '立即去理解这个新架构在设计上的精妙之处。',
                optionB: '先去复现其实验，弄清它成功所依赖的数据和配置。'
            },
            {
                dimension: 'lever',
                question: '当模型在某个罕见的测试场景（corner case）下失败时，你认为更根本的解决方案是？',
                optionA: '设计一个更鲁棒的模型架构或训练范式，使其能从逻辑上泛化到未见场景。',
                optionB: '找到或合成更多这类场景的数据，通过数据增强让模型学会处理它。'
            }
        ];

        // Dimension 4: Innovation Strategy (创新策略)
        const strategyQuestions = [
            {
                dimension: 'strategy',
                question: '你更欣赏哪种类型的科研贡献？',
                optionA: '提出一个可能颠覆主流的全新研究方向，即使它在初期还不成熟。',
                optionB: '在一个主流方向上做出扎实严谨的改进，将性能推向新的高度。'
            },
            {
                dimension: 'strategy',
                question: '面对一个高度"内卷"的研究领域，你的选择是？',
                optionA: '转向一个全新的、人迹罕至的方向，享受开辟新天地的挑战。',
                optionB: '留下来，相信通过专注和努力，依然能做出有价值的增量贡献。'
            },
            {
                dimension: 'strategy',
                question: '在审阅一篇论文时，哪种情况更让你倾向于给出高分？',
                optionA: '想法极具颠覆性，但实验部分略显粗糙，留下了很多开放性问题。',
                optionB: '想法是基于现有工作的改进，但实验部分做得无懈可击，结论非常坚实。'
            },
            {
                dimension: 'strategy',
                question: '回顾AI的发展史，哪种进步模式更让你着迷？',
                optionA: '像深度学习取代传统机器学习那样的范式革命。',
                optionB: '像ResNet架构从几十层到上千层的持续演进。'
            },
            {
                dimension: 'strategy',
                question: '你的科研"品味"更倾向于？',
                optionA: '追求"高风险、高回报"的探索，享受从0到1的创造快感。',
                optionB: '追求"稳扎稳打、精益求精"，享受从1到100的极致优化。'
            },
            {
                dimension: 'strategy',
                question: '在构建代码库时，你的风格更接近？',
                optionA: '倾向于从头搭建一个最适合自己新想法的框架，不畏惧工作量。',
                optionB: '倾向于在成熟框架（如Hugging Face）上做扩展，以确保稳定和高效。'
            },
            {
                dimension: 'strategy',
                question: '你如何看待当前最火的SOTA模型？',
                optionA: '它是等待被下一代全新思想所"颠覆"的对象。',
                optionB: '它是我们应该深入理解和改进的坚实"巨人肩膀"。'
            },
            {
                dimension: 'strategy',
                question: '在你的研究工作中，你如何看待详尽的消融实验？',
                optionA: '它是支撑核心创新的必要部分，但我更享受提出颠覆性想法的过程。',
                optionB: '它不仅是验证，更是探索和理解模型的最佳方式，能带来新的洞见。'
            },
            {
                dimension: 'strategy',
                question: '在做学术报告时，你喜欢如何开场？',
                optionA: '"今天我想挑战一下大家对XX问题的传统看法……"',
                optionB: '"在之前SOTA工作的基础上，我们通过几个关键改进实现了性能新高……"'
            },
            {
                dimension: 'strategy',
                question: '一个项目的规划，你更喜欢哪种？',
                optionA: '设定一个富有挑战性的最终愿景，给予团队充分的自由度去探索路径。',
                optionB: '设定一系列清晰的、可量化的里程碑，确保每周都能看到稳定的进展。'
            }
        ];

        // Combine and shuffle all questions
        this.allQuestions = [
            ...horizonQuestions,
            ...paradigmQuestions,
            ...leverQuestions,
            ...strategyQuestions
        ];

        // Shuffle the questions to randomize order each time
        this.shuffleQuestions();
    }

    initializePersonalities() {
        this.personalities = {
            'FPMR': {
                title: '理论先知',
                englishTitle: 'Theoretical Prophet',
                description: '你是思想的源头，痴迷于用最优雅的公理构建整个世界的解释体系。你追求的是"思想钢印"，渴望提出一个能流传数十年的理论范式。',
                strengths: '极强的抽象思维，能洞察万物背后的第一性原理，提出颠覆性的世界观。',
                needs: '你的理论可能过于超前，以至于找不到合适的数据和算力来验证；容易陷入"思想的空中楼阁"。',
                advice: '[AEDI] 屠榜工程师，TA能将你的理论翻译成代码，并用数据填满你模型的血肉。'
            },
            'FPMI': {
                title: '理论架构师',
                englishTitle: 'Theory Architect',
                description: '你是理论大厦的建造师。你认同现有的基础理论，但致力于用更精巧、更完备的数学和模型框架将其系统化，并小步快跑地验证。',
                strengths: '逻辑严谨，体系化思考能力强，能将零散的理论构件搭建成坚固、优美的体系。',
                needs: '可能过于执着于理论的"完备性"，导致进展缓慢；对那些"不讲道理"的实验现象接受度低。',
                advice: '[FEDR] 规律发现者，TA能为你带来意想不到的、挑战你理论框架的"野路子"数据和现象。'
            },
            'FPDR': {
                title: '数据考古学家',
                englishTitle: 'Data Archaeologist',
                description: '你相信宏大的理论真理隐藏在数据的细节中。你致力于提出全新的理论假设，并像考古学家一样，设计革命性的方法去挖掘和解释数据，以验证你的猜想。',
                strengths: '兼具理论洞察和数据直觉，擅长从平凡数据中挖掘出不凡的理论意义。',
                needs: '你宏大的理论和新颖的数据方法可能都过于非主流，导致两头不靠岸，难以获得学界认同。',
                advice: '[APMI] 第一性原理工程师，TA能欣赏你的理论深度，并将其工程化。'
            },
            'FPDI': {
                title: '白盒工匠',
                englishTitle: 'White Box Artisan',
                description: '你是理论的"手艺人"，坚信好的理论必须在高质量数据上得到精密的验证。你致力于在现有理论框架下，用最严谨的数据工作来打磨理论的每一个细节。',
                strengths: '极度严谨和耐心，能做出"教科书级别"的理论验证和数据集构建工作。',
                needs: '容易陷入对细节的过度追求，可能缺乏对更大图景的想象力。',
                advice: '[AEMR] 性能爆破手，TA的大胆尝试能帮你打破思维定势。'
            },
            'FEMR': {
                title: '黑箱艺术家',
                englishTitle: 'Black Box Artist',
                description: '你是AI领域的"行为艺术家"，不拘泥于理论，坚信通过创造全新的、强大的模型（黑箱），就能激发数据涌现出前所未见的智能，从而拓展我们对世界的认知。',
                strengths: '想象力天马行空，模型设计的"品味"极佳，总能创造出令人惊艳的AI能力。',
                needs: '你的工作可能难以解释和复现，有时会被批评为"炼金术"或"撞大运"。',
                advice: '[APDI] 精密仪器工程师，TA能帮你把"艺术品"变成可靠的"仪器"。'
            },
            'FEMI': {
                title: '炼丹宗师',
                englishTitle: 'Alchemy Grandmaster',
                description: '你是经验主义的集大成者。你站在当前最强模型（SOTA）的肩膀上，通过海量的实验和精湛的调参技艺，持续探索模型能力的边界，并从中总结出新的规律。',
                strengths: '直觉超强，动手能力极快，是"大力出奇迹"和"涌现"现象的敏锐捕捉者。',
                needs: '可能会陷入无尽的"炼丹"循环，对"为什么work"缺乏深究的动力。',
                advice: '[FPMI] 理论架构师，TA能帮你为你的"丹方"找到理论依据，知其所以然。'
            },
            'FEDR': {
                title: '规律发现者',
                englishTitle: 'Pattern Discoverer',
                description: '你是数据中的哥伦bus，坚信新大陆就藏在海量数据中。你痴迷于发明全新的数据分析和可视化方法，从看似混乱的数据中发现颠覆性的、全新的科学规律。',
                strengths: '对数据模式极度敏感，擅长"无监督"学习，能从噪声中识别出信号。',
                needs: '发现的"新规律"可能只是相关性而非因果性，需要更强的理论框架来支撑。',
                advice: '[FPDI] 白盒工匠，TA能帮你用严谨的理论和实验设计来验证你的发现。'
            },
            'FEDI': {
                title: '数据博物学家',
                englishTitle: 'Data Naturalist',
                description: '你像达尔文一样，通过对现有数据的精心收集、分类和迭代分析，来揭示世界运行的深层规律。你相信知识来自于对数据的耐心观察和归纳。',
                strengths: '细致入微，有极强的归纳和总结能力，能构建出领域内最全面的"知识图谱"或数据集。',
                needs: '你的工作可能被视为"脏活累活"，新颖性不足，价值需要长时间才能显现。',
                advice: '[FEMR] 黑箱艺术家，TA能利用你的高质量数据创造出惊人的模型。'
            },
            'APMR': {
                title: '降维打击者',
                englishTitle: 'Dimensionality Striker',
                description: '你是解决应用难题的"破壁人"。你擅长用深刻的理论洞察力，找到一个现有问题的"七寸"，并提出一个基于全新原理的、跨维度的解决方案，一举攻克。',
                strengths: '能精准定位问题核心，提出"思路清奇"的降维打击方案。',
                needs: '你的革命性方案可能过于理想化，忽视了现实世界中数据的复杂性和工程的约束。',
                advice: '[AEDI] 屠榜工程师，TA是最好的"陪练"，能用海量数据和实验来检验你方案的每一个细节。'
            },
            'APMI': {
                title: '第一性原理工程师',
                englishTitle: 'First-Principle Engineer',
                description: '你是工程师中的哲学家，坚信最好的工程实践一定源于清晰的理论。你致力于将第一性原理应用到现有模型和系统中，进行持续、深入的优化。',
                strengths: '基础极其扎实，能做出鲁棒性极强、可解释性极高的系统。',
                needs: '有时可能过于"学院派"，对工业界一些"野路子"但有效的方法不够开放。',
                advice: '[AEMI] 调参魔导士，TA能告诉你很多"不讲武德"但超好用的tricks。'
            },
            'APDR': {
                title: '代码魔术师',
                englishTitle: 'Code Magician',
                description: '你是理论的实践者，致力于用全新的数据处理和工程范式来解决现实问题。你可能发明一种新的数据结构或编程框架，从根本上改变某个应用领域的开发效率。',
                strengths: '兼具理论深度和编程能力，能创造出优雅而高效的工具，赋能他人。',
                needs: '你的"轮子"可能过于超前，社区和用户需要很长时间才能理解和接受。',
                advice: '[AEDI] 屠榜工程师，TA会是你新工具的"天使用户"和"压力测试员"。'
            },
            'APDI': {
                title: '精密仪器工程师',
                englishTitle: 'Precision Instrument Engineer',
                description: '你是可靠性的化身。你相信理论和数据的完美结合，致力于用最严谨的工程方法，打造出稳定、精确、可信赖的AI系统，像制造一台精密仪器一样。',
                strengths: '极度注重细节和质量，是项目中"兜底"和"擦屁股"的最佳人选。',
                needs: '可能因为追求完美而牺牲了速度，有时在快速变化的市场或研究前沿中会错失良机。',
                advice: '[AEMR] 性能爆破手，TA能推动你更快地发布和迭代。'
            },
            'AEMR': {
                title: '性能爆破手',
                englishTitle: 'Performance Blaster',
                description: '你是效果的"猛士"，为了解决一个实际问题，你会毫不犹豫地祭出最大、最新、最暴力的模型，用"饱和式攻击"来炸出最佳性能。',
                strengths: '行动力极强，对新技术极其敏锐，总能用最"潮"的方法快速拿到惊艳的结果。',
                needs: '解决方案可能成本高昂、难以维护，且对背后的原理不求甚解，是"一把梭哈"的赌徒。',
                advice: '[APMI] 第一性原理工程师，TA能帮你把"大力出奇迹"变得更可持续、更可控。'
            },
            'AEMI': {
                title: '调参魔导士',
                englishTitle: 'Hyperparameter Wizard',
                description: '你是应用效果的"魔法师"，对现有模型和系统的每一个角落都了如指掌。你通过精妙的实验设计和大量的"黑话"tricks，将模型的性能调至毫厘之间的极限。',
                strengths: '经验丰富，有超凡的耐心和直觉，是提升项目效果最后1%的关键先生/女士。',
                needs: '容易陷入调参的"玄学"中，有时会忽视更底层的模型或数据问题。',
                advice: '[APDR] 代码魔术师，TA可能会给你一个全新的工具，让你不再需要手动调参。'
            },
            'AEDR': {
                title: '增长黑客',
                englishTitle: 'Growth Hacker',
                description: '你是价值发现的"黑客"，坚信数据中蕴藏着解决问题的捷径。你擅长用创造性的、非常规的数据获取和利用方法，来快速、颠覆性地提升一个应用指标。',
                strengths: '思维活跃，不拘一格，总能找到"四两拨千斤"的数据杠杆点。',
                needs: '方法可能游走在"灰色地带"，有时为了短期增长会牺牲长期价值或用户体验。',
                advice: '[APDI] 精密仪器工程师，TA能帮你建立更稳健、更长期的价值评估体系。'
            },
            'AEDI': {
                title: '屠榜工程师',
                englishTitle: 'Benchmark Slayer',
                description: '你是公认赛道上的"王者"，是严谨和务实的代名词。你致力于在明确的规则（benchmark）下，通过精细的数据工程和持续的迭代优化，将系统性能做到极致。',
                strengths: '极其严谨、专注和有毅力，能交付稳定、高效、可复现的SOTA结果。',
                needs: '可能过于专注"刷分"，对榜单本身是否合理、问题定义是否过时不够敏感。',
                advice: '[FPMR] 理论先知，TA会告诉你，也许是时候换个游戏玩了。'
            }
        };
    }

    shuffleQuestions() {
        // Fisher-Yates shuffle algorithm for randomizing question order
        this.shuffledQuestions = [...this.allQuestions];
        for (let i = this.shuffledQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffledQuestions[i], this.shuffledQuestions[j]] = 
            [this.shuffledQuestions[j], this.shuffledQuestions[i]];
        }
    }

    bindEvents() {
        // Start button
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startAssessment();
        });

        // Navigation buttons
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousQuestion();
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('finish-btn').addEventListener('click', () => {
            this.showResults();
        });

        // Restart button
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });
    }

    startAssessment() {
        this.showSection('assessment-section');
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.displayQuestion();
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    displayQuestion() {
        const question = this.shuffledQuestions[this.currentQuestionIndex];
        const questionContainer = document.getElementById('question-container');
        
        questionContainer.innerHTML = `
            <div class="question-content">
                <h3>${question.question}</h3>
                <div class="options-container">
                    <div class="option-pair">
                        <div class="option-text">
                            <div class="option-label">选项 A</div>
                            ${question.optionA}
                        </div>
                    </div>
                    <div class="scale-options">
                        <div class="scale-option" data-value="3">
                            <input type="radio" name="answer" value="3" id="scale-3">
                            <label for="scale-3" class="scale-label">非常倾向A</label>
                        </div>
                        <div class="scale-option" data-value="2">
                            <input type="radio" name="answer" value="2" id="scale-2">
                            <label for="scale-2" class="scale-label">比较倾向A</label>
                        </div>
                        <div class="scale-option" data-value="1">
                            <input type="radio" name="answer" value="1" id="scale-1">
                            <label for="scale-1" class="scale-label">稍微倾向A</label>
                        </div>
                        <div class="scale-option" data-value="0">
                            <input type="radio" name="answer" value="0" id="scale-0">
                            <label for="scale-0" class="scale-label">中立</label>
                        </div>
                        <div class="scale-option" data-value="-1">
                            <input type="radio" name="answer" value="-1" id="scale--1">
                            <label for="scale--1" class="scale-label">稍微倾向B</label>
                        </div>
                        <div class="scale-option" data-value="-2">
                            <input type="radio" name="answer" value="-2" id="scale--2">
                            <label for="scale--2" class="scale-label">比较倾向B</label>
                        </div>
                        <div class="scale-option" data-value="-3">
                            <input type="radio" name="answer" value="-3" id="scale--3">
                            <label for="scale--3" class="scale-label">非常倾向B</label>
                        </div>
                    </div>
                    <div class="option-pair">
                        <div class="option-text">
                            <div class="option-label">选项 B</div>
                            ${question.optionB}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add click handlers for scale options
        document.querySelectorAll('.scale-option').forEach(option => {
            option.addEventListener('click', (e) => {
                // Remove previous selection
                document.querySelectorAll('.scale-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selection to clicked option
                option.classList.add('selected');
                option.querySelector('input').checked = true;
                
                // Store the answer
                this.answers[this.currentQuestionIndex] = {
                    dimension: question.dimension,
                    value: parseInt(e.currentTarget.dataset.value)
                };
                
                // Update navigation buttons (this handles both next button and finish button)
                this.updateNavigation();
            });
        });

        // Restore previous answer if exists
        if (this.answers[this.currentQuestionIndex]) {
            const value = this.answers[this.currentQuestionIndex].value;
            const option = document.querySelector(`[data-value="${value}"]`);
            if (option) {
                option.classList.add('selected');
                option.querySelector('input').checked = true;
            }
        }

        // Update progress and navigation (this handles button states correctly)
        this.updateProgress();
        this.updateNavigation();
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.shuffledQuestions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.shuffledQuestions.length;
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const finishBtn = document.getElementById('finish-btn');

        // Previous button
        prevBtn.disabled = this.currentQuestionIndex === 0;

        // Next/Finish button
        const isLastQuestion = this.currentQuestionIndex === this.shuffledQuestions.length - 1;
        const hasAnswer = !!this.answers[this.currentQuestionIndex];
        
        if (isLastQuestion) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'block';
            finishBtn.disabled = !hasAnswer;
            
            // Debug log for last question
            if (hasAnswer) {
                console.log('✅ Last question answered, enabling finish button');
            }
        } else {
            nextBtn.style.display = 'block';
            finishBtn.style.display = 'none';
            nextBtn.disabled = !hasAnswer;
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.shuffledQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    calculateResults() {
        const scores = {
            horizon: 0,    // F vs A (positive = F, negative = A)
            paradigm: 0,   // P vs E (positive = P, negative = E)
            lever: 0,      // M vs D (positive = M, negative = D)
            strategy: 0    // R vs I (positive = R, negative = I)
        };

        // Sum up scores for each dimension
        Object.values(this.answers).forEach(answer => {
            scores[answer.dimension] += answer.value;
        });

        // Determine personality type based on scores
        let personalityCode = '';
        personalityCode += scores.horizon >= 0 ? 'F' : 'A';
        personalityCode += scores.paradigm >= 0 ? 'P' : 'E';
        personalityCode += scores.lever >= 0 ? 'M' : 'D';
        personalityCode += scores.strategy >= 0 ? 'R' : 'I';

        return { scores, personalityCode };
    }

    showResults() {
        const { scores, personalityCode } = this.calculateResults();
        const personality = this.personalities[personalityCode];

        // Display personality information
        document.getElementById('personality-type').textContent = personalityCode;
        document.getElementById('personality-title').textContent = `${personality.title} (${personality.englishTitle})`;
        document.getElementById('personality-desc').textContent = personality.description;
        document.getElementById('personality-strengths').textContent = personality.strengths;
        document.getElementById('personality-needs').textContent = personality.needs;
        document.getElementById('personality-advice').textContent = personality.advice;

        // Create dimension visualization
        this.createDimensionVisualization(scores);

        // Show results section
        this.showSection('results-section');
    }

    createDimensionVisualization(scores) {
        const chartContainer = document.getElementById('dimension-chart');
        
        const dimensions = [
            {
                name: '科研坐标',
                englishName: 'The Horizon',
                leftLabel: '脚踏实地',
                rightLabel: '仰望星空',
                leftEnglish: '<span class="first-letter">A</span>pplied-Focused',
                rightEnglish: '<span class="first-letter">F</span>rontier-Focused',
                score: scores.horizon,
                color: '#3498db'
            },
            {
                name: '认知范式',
                englishName: 'The Paradigm',
                leftLabel: '实践出真知',
                rightLabel: '理论为王',
                leftEnglish: '<span class="first-letter">E</span>mpiricism',
                rightEnglish: '<span class="first-letter">P</span>rinciple-First',
                score: scores.paradigm,
                color: '#e74c3c'
            },
            {
                name: '增长杠杆',
                englishName: 'The Lever',
                leftLabel: '数据为王',
                rightLabel: '模型至上',
                leftEnglish: '<span class="first-letter">D</span>ata-Centric',
                rightEnglish: '<span class="first-letter">M</span>odel-Centric',
                score: scores.lever,
                color: '#f39c12'
            },
            {
                name: '创新策略',
                englishName: 'The Strategy',
                leftLabel: '精益求精',
                rightLabel: '暴力颠覆',
                leftEnglish: '<span class="first-letter">I</span>terative',
                rightEnglish: '<span class="first-letter">R</span>evolutionary',
                score: scores.strategy,
                color: '#9b59b6'
            }
        ];

        chartContainer.innerHTML = dimensions.map(dimension => {
            // Calculate position: center is 50%, range is roughly ±30 points
            const maxScore = 30;
            const clampedScore = Math.max(-maxScore, Math.min(maxScore, dimension.score));
            const scorePercent = (clampedScore / maxScore) * 50; // Convert to percentage of half-axis
            const markerPosition = 50 + scorePercent; // Center (50%) + offset
            
            // Calculate deviation percentage: 50% is center, 100% is complete deviation
            const deviationPercent = Math.round(50 + Math.abs(scorePercent));
            
            // Determine fill direction and style (fix transparency issue for screenshots)
            let fillStyle = '';
            if (clampedScore > 0) {
                // Positive score: fill from center to right - use solid colors for screenshot compatibility
                const fillWidth = Math.abs(scorePercent);
                fillStyle = `left: 50%; width: ${fillWidth}%; background: linear-gradient(90deg, rgba(255,255,255,1) 0%, ${dimension.color} 100%);`;
            } else if (clampedScore < 0) {
                // Negative score: fill from center to left - use solid colors for screenshot compatibility
                const fillWidth = Math.abs(scorePercent);
                fillStyle = `right: 50%; width: ${fillWidth}%; background: linear-gradient(90deg, ${dimension.color} 0%, rgba(255,255,255,1) 100%);`;
            } else {
                // Zero score: no fill
                fillStyle = 'width: 0%;';
            }
            
            return `
                <div class="dimension-axis">
                    <div class="dimension-title-row">
                        <div class="dimension-title">
                            ${dimension.name} <span class="dimension-english">${dimension.englishName}</span>
                        </div>
                    </div>
                    <div class="axis-info">
                        <div class="label-group">
                            <span class="label-text">${dimension.leftLabel}</span>
                            <span class="label-english">${dimension.leftEnglish}</span>
                        </div>
                        <div class="deviation-percent">${deviationPercent}%</div>
                        <div class="label-group">
                            <span class="label-text">${dimension.rightLabel}</span>
                            <span class="label-english">${dimension.rightEnglish}</span>
                        </div>
                    </div>
                    <div class="axis-bar">
                        <div class="axis-fill" style="${fillStyle}"></div>
                        <div class="axis-marker" style="left: ${markerPosition}%; background: ${dimension.color};"></div>
                    </div>
                </div>
            `;
        }).join('');
    }


    restart() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.shuffleQuestions(); // Reshuffle questions for new session
        this.showSection('intro-section');
    }

    // Debug functionality - hidden from regular users
    bindDebugEvents() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            this.debugKeySequence.push(key);
            
            // Keep only the last 5 keys
            if (this.debugKeySequence.length > 5) {
                this.debugKeySequence.shift();
            }
            
            // Check if the debug sequence is entered
            if (this.debugKeySequence.length === 5 && 
                this.debugKeySequence.every((key, index) => key === this.debugKeyTarget[index])) {
                this.activateDebugMode();
                this.debugKeySequence = []; // Reset sequence
            }
        });
    }

    activateDebugMode() {
        console.log('🐛 Debug mode activated!');
        
        // If we're in assessment mode, fill all answers with random values and show results
        if (document.getElementById('assessment-section').classList.contains('active')) {
            this.fillRandomAnswers();
            this.showResults();
            console.log('✅ Auto-filled all questions and showing results');
        } else if (document.getElementById('intro-section').classList.contains('active')) {
            // If we're in intro, start assessment and then fill and show results
            this.startAssessment();
            setTimeout(() => {
                this.fillRandomAnswers();
                this.showResults();
                console.log('✅ Started assessment, filled answers, and showing results');
            }, 100);
        }
    }

    fillRandomAnswers() {
        // Fill all questions with random answers for testing
        this.shuffledQuestions.forEach((question, index) => {
            // Generate random score between -3 and 3
            const randomScore = Math.floor(Math.random() * 7) - 3;
            this.answers[index] = {
                dimension: question.dimension,
                value: randomScore
            };
        });
        console.log('🎲 Generated random answers:', this.answers);
    }
}

// Initialize the assessment when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIResearcherAssessment();
});
