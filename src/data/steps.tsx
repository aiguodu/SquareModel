import { BookOpen, Square, TriangleRight, CheckCircle2, Calculator, Target } from "lucide-react";
import { ReactNode } from "react";

export interface StepData {
  title: string;
  icon: ReactNode;
  desc: string;
  detail: string;
  tts: string;
}

export const stepsData: StepData[] = [
  {
    title: "解题思路：全局概览",
    icon: <BookOpen className="w-5 h-5 text-blue-600" />,
    desc: "分析题目已知条件，寻找解题突破口。",
    detail: "已知条件：\n1. ∠AOB = 90°\n2. OP 平分 ∠AOB\n3. PA ⊥ OA\n\n核心策略：\n遇到角平分线和垂直，常利用角平分线性质作垂线，构造全等三角形或正方形，将分散的线段联系起来。本题属于经典的“一线三直角”与正方形结合的模型。",
    tts: "同学们好！今天我们来看一道经典的“一线三直角”与正方形结合的综合探究题。这道题的核心在于利用角平分线和垂直条件构造全等三角形。遇到垂直和角平分线，我们通常会想到作垂线，构造正方形和全等三角形，将分散的线段转化到一起。"
  },
  {
    title: "第一步：构造正方形",
    icon: <Square className="w-5 h-5 text-indigo-600" />,
    desc: "解决第一问，求 ∠APC 的度数。",
    detail: "作辅助线：过点 P 作 PC ⊥ OB 于点 C。\n\n证明过程：\n∵ OP 平分 ∠AOB，PA ⊥ OA，PC ⊥ OB\n∴ PA = PC (角平分线性质)\n又∵ ∠AOB = ∠PAO = ∠PCO = 90°\n∴ 四边形 AOCP 是矩形\n∵ PA = PC\n∴ 矩形 AOCP 是正方形\n∴ ∠APC = 90°",
    tts: "我们先看第一问。过点P向OB作垂线PC。因为OP是角平分线，且PA垂直于OA，PC垂直于OB，根据角平分线的性质，PA等于PC。同时，四边形AOCP有三个角是直角，所以它是一个矩形，再加上邻边相等，它就是一个正方形。因此，角APC等于90度。"
  },
  {
    title: "第二步：拆分线段",
    icon: <Target className="w-5 h-5 text-emerald-600" />,
    desc: "解决第二问，探究 OM + ON 与 PA 的关系。",
    detail: "目标：证明 OM + ON = 2PA\n\n线段转化：\n由正方形 AOCP 可知：OA = OC = PA\n将 OM 和 ON 拆分：\nOM = OA - AM\nON = OC + CN\n\n代入原式：\nOM + ON = (OA - AM) + (OC + CN)\n= OA + OC - AM + CN\n= 2PA - AM + CN\n\n思路：若能证明 AM = CN，则结论成立。",
    tts: "接下来看第二问。要证明OM加ON等于2PA，我们需要把OM和ON联系起来。已知正方形AOCP，所以OA等于OC等于PA。我们把OM和ON拆分，OM等于OA减去AM，ON等于OC加上CN。如果能证明AM等于CN，问题就迎刃而解了。"
  },
  {
    title: "第三步：证明三角形全等",
    icon: <TriangleRight className="w-5 h-5 text-rose-600" />,
    desc: "利用“一线三直角”模型证明 △APM ≌ △CPN。",
    detail: "寻找全等条件：\n1. 已知 PA = PC\n2. ∠PAM = ∠PCN = 90°\n3. 寻找角的关系：\n   ∵ ∠APC = 90°，∠MPN = 90°\n   ∴ ∠APM + ∠MPC = 90°\n   ∴ ∠CPN + ∠MPC = 90°\n   ∴ ∠APM = ∠CPN (同角的余角相等)\n\n证明全等：\n在 △APM 和 △CPN 中：\n∠PAM = ∠PCN\nPA = PC\n∠APM = ∠CPN\n∴ △APM ≌ △CPN (ASA)",
    tts: "怎么证明AM等于CN呢？我们来看三角形APM和三角形CPN。因为角APC是90度，角MPN也是90度，同角的余角相等，所以角APM等于角CPN。加上PA等于PC，角A等于角C等于90度，根据角边角定理，这两个三角形全等！"
  },
  {
    title: "第四步：得出第二问结论",
    icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    desc: "利用全等三角形性质完成证明。",
    detail: "结论推导：\n∵ △APM ≌ △CPN\n∴ AM = CN\n\n回到之前的等式：\nOM + ON = (OA - AM) + (OC + CN)\n= OA + OC + (CN - AM)\n= OA + OC + 0\n= 2OA\n\n∵ OA = PA\n∴ OM + ON = 2PA\n第二问得证。",
    tts: "既然三角形全等，那么AM就等于CN。回到我们刚才的等式：OM加ON，等于OA减去AM，加上OC加上CN。因为AM等于CN，一减一加抵消了，结果就是OA加OC，也就是两个PA。第二问得证！"
  },
  {
    title: "第五步：代数法求解第三问",
    icon: <Calculator className="w-5 h-5 text-purple-600" />,
    desc: "利用已知比例关系，求出各线段长度。",
    detail: "已知条件：ON = 3OM\n\n设 OA = a，则 PA = a，OC = a\nOM = a - AM\nON = a + CN = a + AM (因为 AM = CN)\n\n代入比例关系：\na + AM = 3(a - AM)\na + AM = 3a - 3AM\n4AM = 2a\nAM = a/2\n\n由此可得：\nOM = a - a/2 = a/2\nON = a + a/2 = 3a/2",
    tts: "最后看第三问。已知ON等于3倍的OM，结合我们刚才得出的结论，AM等于CN。设OA为a，那么OM等于a减AM，ON等于a加AM。解方程可以得到，AM等于二分之一a，所以OM是二分之一a，ON是二分之三a。"
  },
  {
    title: "第六步：建系求比值",
    icon: <Target className="w-5 h-5 text-orange-600" />,
    desc: "建立平面直角坐标系，利用坐标求线段比值。",
    detail: "以 O 为原点，OB 为 x 轴，OA 为 y 轴建系。\n坐标表示：\nO(0, 0), P(a, a), M(0, a/2), N(3a/2, 0)\n\n求直线方程：\n直线 PO: y = x\n直线 MN: y = -1/3x + a/2\n\n求交点 F：\nx = -1/3x + a/2  =>  4/3x = a/2  =>  x = 3a/8\n∴ F(3a/8, 3a/8)\n\n计算距离：\nOP = √(a² + a²) = √2a\nOF = √((3a/8)² + (3a/8)²) = (3√2/8)a\n\n计算比值：\nOP / OF = √2a / ((3√2/8)a) = 8/3",
    tts: "要求OP比OF的值，我们可以借助相似三角形或者建立平面直角坐标系。以O为原点建系，P点坐标是(a, a)，M点是(0, a/2)，N点是(3a/2, 0)。求出直线MN和直线OP的交点F的坐标，最后利用两点距离公式，算出OP比OF的值等于三分之八。"
  }
];
