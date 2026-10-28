// 시드(seed) 기반 난수 생성기 (mulberry32).
// Math.random() 을 서버 컴포넌트에서 쓰면 서버와 브라우저가 서로 다른 값을 그려
// "hydration mismatch" 오류가 난다. 시드를 고정하면 항상 같은 순서의 난수가 나와 안전하다.
export function createSeededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
