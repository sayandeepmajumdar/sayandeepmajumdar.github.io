import { PseudocodeLine } from '../../../engine/Step';
import { LinkedListOperationId } from '../types';

export const LINKED_LIST_PSEUDOCODE: Record<LinkedListOperationId, PseudocodeLine[]> = {
  prepend: [
    { lineNumber: 1, indent: 0, code: 'function insertAtBeginning(head, value):' },
    { lineNumber: 2, indent: 1, code: 'newNode = new Node(value)', comment: 'Allocate heap memory' },
    { lineNumber: 3, indent: 1, code: 'newNode.next = head', comment: 'Point new node to current head' },
    { lineNumber: 4, indent: 1, code: 'head = newNode', comment: 'Update head reference' },
    { lineNumber: 5, indent: 1, code: 'if tail == null: tail = newNode', comment: 'Update tail if list was empty' },
    { lineNumber: 6, indent: 1, code: 'return head', comment: 'O(1) time - no elements shift' },
  ],

  append: [
    { lineNumber: 1, indent: 0, code: 'function insertAtEnd(head, tail, value):' },
    { lineNumber: 2, indent: 1, code: 'newNode = new Node(value)', comment: 'Allocate heap memory' },
    { lineNumber: 3, indent: 1, code: 'if head == null:', comment: 'List is empty' },
    { lineNumber: 4, indent: 2, code: 'head = newNode, tail = newNode' },
    { lineNumber: 5, indent: 1, code: 'else:', comment: 'Link after current tail' },
    { lineNumber: 6, indent: 2, code: 'tail.next = newNode', comment: 'Old tail points to new node' },
    { lineNumber: 7, indent: 2, code: 'tail = newNode', comment: 'Advance tail reference' },
    { lineNumber: 8, indent: 1, code: 'return { head, tail }', comment: 'O(1) with tail pointer' },
  ],

  insertAt: [
    { lineNumber: 1, indent: 0, code: 'function insertAtIndex(head, index, value):' },
    { lineNumber: 2, indent: 1, code: 'if index == 0: return insertAtBeginning(value)' },
    { lineNumber: 3, indent: 1, code: 'curr = head', comment: 'Traverse to index - 1' },
    { lineNumber: 4, indent: 1, code: 'for i = 0 to index - 2: curr = curr.next' },
    { lineNumber: 5, indent: 1, code: 'newNode = new Node(value)', comment: 'Allocate node' },
    { lineNumber: 6, indent: 1, code: 'newNode.next = curr.next', comment: 'Splice: point to successor first' },
    { lineNumber: 7, indent: 1, code: 'curr.next = newNode', comment: 'Splice: predecessor points to newNode' },
    { lineNumber: 8, indent: 1, code: 'if newNode.next == null: tail = newNode' },
  ],

  insertAfter: [
    { lineNumber: 1, indent: 0, code: 'function insertAfterNode(targetNode, value):' },
    { lineNumber: 2, indent: 1, code: 'newNode = new Node(value)', comment: 'Allocate heap memory' },
    { lineNumber: 3, indent: 1, code: 'newNode.next = targetNode.next', comment: 'Connect newNode to successor' },
    { lineNumber: 4, indent: 1, code: 'targetNode.next = newNode', comment: 'Rewire targetNode to newNode' },
    { lineNumber: 5, indent: 1, code: 'if targetNode == tail: tail = newNode' },
    { lineNumber: 6, indent: 1, code: 'return head', comment: 'O(1) once target node reference is known' },
  ],

  deleteBeginning: [
    { lineNumber: 1, indent: 0, code: 'function deleteBeginning(head):' },
    { lineNumber: 2, indent: 1, code: 'if head == null: return null', comment: 'Empty list check' },
    { lineNumber: 3, indent: 1, code: 'removedNode = head', comment: 'Keep reference to old head' },
    { lineNumber: 4, indent: 1, code: 'head = head.next', comment: 'Advance head to next node' },
    { lineNumber: 5, indent: 1, code: 'if head == null: tail = null', comment: 'List is now empty' },
    { lineNumber: 6, indent: 1, code: 'recycle(removedNode)', comment: 'O(1) - no shifting required' },
  ],

  deleteEnd: [
    { lineNumber: 1, indent: 0, code: 'function deleteEnd(head, tail):' },
    { lineNumber: 2, indent: 1, code: 'if head == null: return null' },
    { lineNumber: 3, indent: 1, code: 'if head == tail: head = null, tail = null; return' },
    { lineNumber: 4, indent: 1, code: 'prev = head', comment: 'Must traverse to node before tail' },
    { lineNumber: 5, indent: 1, code: 'while prev.next != tail: prev = prev.next' },
    { lineNumber: 6, indent: 1, code: 'prev.next = null', comment: 'Sever tail link' },
    { lineNumber: 7, indent: 1, code: 'tail = prev', comment: 'Update tail reference' },
  ],

  deleteAt: [
    { lineNumber: 1, indent: 0, code: 'function deleteAtIndex(head, index):' },
    { lineNumber: 2, indent: 1, code: 'if index == 0: return deleteBeginning(head)' },
    { lineNumber: 3, indent: 1, code: 'prev = head', comment: 'Traverse to node before target' },
    { lineNumber: 4, indent: 1, code: 'for i = 0 to index - 2: prev = prev.next' },
    { lineNumber: 5, indent: 1, code: 'target = prev.next', comment: 'Node to remove' },
    { lineNumber: 6, indent: 1, code: 'prev.next = target.next', comment: 'Bypass target node' },
    { lineNumber: 7, indent: 1, code: 'if target == tail: tail = prev' },
    { lineNumber: 8, indent: 1, code: 'recycle(target)', comment: 'Unlinked node is garbage collected' },
  ],

  deleteValue: [
    { lineNumber: 1, indent: 0, code: 'function deleteByValue(head, targetVal):' },
    { lineNumber: 2, indent: 1, code: 'curr = head, prev = null' },
    { lineNumber: 3, indent: 1, code: 'while curr != null and curr.value != targetVal:' },
    { lineNumber: 4, indent: 2, code: 'prev = curr; curr = curr.next', comment: 'Advance pointers' },
    { lineNumber: 5, indent: 1, code: 'if curr == null: return "Not Found"', comment: 'Value not in list' },
    { lineNumber: 6, indent: 1, code: 'if prev == null: head = curr.next', comment: 'Deleting head node' },
    { lineNumber: 7, indent: 1, code: 'else: prev.next = curr.next', comment: 'Bypass matching node' },
    { lineNumber: 8, indent: 1, code: 'if curr == tail: tail = prev' },
    { lineNumber: 9, indent: 1, code: 'recycle(curr)', comment: 'Node detached from chain' },
  ],

  search: [
    { lineNumber: 1, indent: 0, code: 'function search(head, target):' },
    { lineNumber: 2, indent: 1, code: 'curr = head, pos = 0' },
    { lineNumber: 3, indent: 1, code: 'while curr != null:' },
    { lineNumber: 4, indent: 2, code: 'if curr.value == target: return pos', comment: 'Target found!' },
    { lineNumber: 5, indent: 2, code: 'curr = curr.next; pos = pos + 1', comment: 'Traverse next link' },
    { lineNumber: 6, indent: 1, code: 'return -1', comment: 'Reached NULL - target not present' },
  ],

  length: [
    { lineNumber: 1, indent: 0, code: 'function findLength(head):' },
    { lineNumber: 2, indent: 1, code: 'curr = head, count = 0' },
    { lineNumber: 3, indent: 1, code: 'while curr != null:' },
    { lineNumber: 4, indent: 2, code: 'count = count + 1', comment: 'Count visited node' },
    { lineNumber: 5, indent: 2, code: 'curr = curr.next', comment: 'Follow pointer to next node' },
    { lineNumber: 6, indent: 1, code: 'return count', comment: 'O(n) time for singly linked list' },
  ],

  reverse: [
    { lineNumber: 1, indent: 0, code: 'function reverseList(head):' },
    { lineNumber: 2, indent: 1, code: 'prev = null, curr = head' },
    { lineNumber: 3, indent: 1, code: 'tail = head', comment: 'Original head becomes the new tail' },
    { lineNumber: 4, indent: 1, code: 'while curr != null:' },
    { lineNumber: 5, indent: 2, code: 'next = curr.next', comment: '1. Store reference to next node' },
    { lineNumber: 6, indent: 2, code: 'curr.next = prev', comment: '2. REVERSE: point arrow backwards' },
    { lineNumber: 7, indent: 2, code: 'prev = curr', comment: '3. Advance prev to current' },
    { lineNumber: 8, indent: 2, code: 'curr = next', comment: '4. Advance curr to stored next' },
    { lineNumber: 9, indent: 1, code: 'head = prev', comment: '5. Head now points to new front node' },
    { lineNumber: 10, indent: 1, code: 'return head', comment: 'Reversed in O(n) time & O(1) space' },
  ],

  update: [
    { lineNumber: 1, indent: 0, code: 'function updateValue(head, index, newValue):' },
    { lineNumber: 2, indent: 1, code: 'curr = head' },
    { lineNumber: 3, indent: 1, code: 'for i = 0 to index - 1: curr = curr.next', comment: 'Traverse to index' },
    { lineNumber: 4, indent: 1, code: 'curr.value = newValue', comment: 'Direct in-place payload update' },
    { lineNumber: 5, indent: 1, code: 'return head', comment: 'Pointers remain unchanged' },
  ],
};
