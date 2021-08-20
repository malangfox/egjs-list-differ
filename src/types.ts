/*
egjs-list-differ
Copyright (c) 2019-present NAVER Corp.
MIT license
*/
export interface MapInterface<T, U> {
  get(key: T): U | undefined;
  set(key: T, value: U): any;
}
export type MapConstructor<T, U> = new () => MapInterface<T, U>;
export interface ListFormat<T = any> {
  [index: number]: T;
  length: number;
}
export interface PrevRecord<T> {
  prevItem: T;
  prevIndex: number;
}
export interface CurrentRecord<T> {
  currentItem: T;
  currentIndex: number;
}
export interface MaintainedRecord<T> {
  prevItem: T;
  currentItem: T;
  prevIndex: number;
  currentIndex: number;
}
export interface OrderedRecord<T> {
  prevItem: T;
  currentItem: T;
  anchor: T | null;
  prevIndex: number;
  currentIndex: number;
  beforeOrderIndex: number;
  afterOrderIndex: number;
  anchorIndex: number;
}
type EachMethod<T> = (fn: (record: T) => void) => void;
/**
 * @typedef
 * @memberof eg.ListDiffer
 * @property - List before update <ko>업데이트하기 전 데이터</ko>
 * @property - Updated list <ko>업데이트하는 데이터</ko>
 * @property - Index array of values added to `list` <ko>`list`에서 추가되는 데이터의 인덱스 배열</ko>
 * @property - Index array of values removed in `prevList` <ko>`prevList`에서 제거되는 데이터의 인덱스 배열</ko>
 * @property - An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`<ko>이전 리스트`prevList`와 지금 리스트`list`에서 위치가 다른 `prevList`와 `list`의 인덱스 배열들</ko>
 * @property - An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>) <ko>데이터를 추가하기 전 `list`를 동기화할 수 있는 정렬되는 인덱스 배열들(형태: Array<[이전 인덱스, 다음 인덱스]>) </ko>
 * @property - An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved<ko>추가/삭제 되지 않아 데이터가 보존된 `prevList`와 `list`의 인덱스 배열들</ko>
 */
export interface DiffResult<T> {
  prevList: T[];
  list: T[];
  added: CurrentRecord<T>[];
  removed: PrevRecord<T>[];
  changed: MaintainedRecord<T>[];
  ordered: OrderedRecord<T>[];
  maintained: MaintainedRecord<T>[];
  forEachAdded: EachMethod<CurrentRecord<T>>;
  forEachAddedRight: EachMethod<CurrentRecord<T>>;
  forEachRemoved: EachMethod<PrevRecord<T>>;
  forEachChanged: EachMethod<MaintainedRecord<T>>;
  forEachOrdered: EachMethod<OrderedRecord<T>>;
  forEachMaintained: EachMethod<MaintainedRecord<T>>;
}
