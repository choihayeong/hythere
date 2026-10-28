// public/works/{id}.jpg 가 존재하는 프로젝트 id 목록. 썸네일을 추가·삭제하면 여기도 맞춘다.
// (클라이언트 컴포넌트에서는 파일 시스템을 읽을 수 없어 목록을 코드로 둔다)
export const thumbnailIds: ReadonlySet<number> = new Set([
  40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 29, 28, 27, 26, 25, 23, 19, 18, 17, 16,
]);
