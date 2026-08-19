import React, { useState, useEffect, useMemo, useRef } from "react";

/* ------------------------------------------------------------------ *
 *  NeetCode 150 problem table: [title, neetcode slug, leetcode slug, difficulty]
 * ------------------------------------------------------------------ */
const RAW = [
  ["Contains Duplicate","duplicate-integer","contains-duplicate","E"],
  ["Valid Anagram","is-anagram","valid-anagram","E"],
  ["Two Sum","two-integer-sum","two-sum","E"],
  ["Group Anagrams","anagram-groups","group-anagrams","M"],
  ["Top K Frequent Elements","top-k-elements-in-list","top-k-frequent-elements","M"],
  ["Encode and Decode Strings","string-encode-and-decode","encode-and-decode-strings","M"],
  ["Product of Array Except Self","products-of-array-discluding-self","product-of-array-except-self","M"],
  ["Valid Sudoku","valid-sudoku","valid-sudoku","M"],
  ["Longest Consecutive Sequence","longest-consecutive-sequence","longest-consecutive-sequence","M"],
  ["Valid Palindrome","is-palindrome","valid-palindrome","E"],
  ["Two Sum II Input Array Is Sorted","two-integer-sum-ii","two-sum-ii-input-array-is-sorted","M"],
  ["3Sum","three-integer-sum","3sum","M"],
  ["Container With Most Water","max-water-container","container-with-most-water","M"],
  ["Trapping Rain Water","trapping-rain-water","trapping-rain-water","H"],
  ["Best Time to Buy And Sell Stock","buy-and-sell-crypto","best-time-to-buy-and-sell-stock","E"],
  ["Longest Substring Without Repeating Characters","longest-substring-without-duplicates","longest-substring-without-repeating-characters","M"],
  ["Longest Repeating Character Replacement","longest-repeating-substring-with-replacement","longest-repeating-character-replacement","M"],
  ["Permutation In String","permutation-string","permutation-in-string","M"],
  ["Minimum Window Substring","minimum-window-with-characters","minimum-window-substring","H"],
  ["Sliding Window Maximum","sliding-window-maximum","sliding-window-maximum","H"],
  ["Valid Parentheses","validate-parentheses","valid-parentheses","E"],
  ["Min Stack","minimum-stack","min-stack","M"],
  ["Evaluate Reverse Polish Notation","evaluate-reverse-polish-notation","evaluate-reverse-polish-notation","M"],
  ["Daily Temperatures","daily-temperatures","daily-temperatures","M"],
  ["Car Fleet","car-fleet","car-fleet","M"],
  ["Largest Rectangle In Histogram","largest-rectangle-in-histogram","largest-rectangle-in-histogram","H"],
  ["Binary Search","binary-search","binary-search","E"],
  ["Search a 2D Matrix","search-2d-matrix","search-a-2d-matrix","M"],
  ["Koko Eating Bananas","eating-bananas","koko-eating-bananas","M"],
  ["Find Minimum In Rotated Sorted Array","find-minimum-in-rotated-sorted-array","find-minimum-in-rotated-sorted-array","M"],
  ["Search In Rotated Sorted Array","find-target-in-rotated-sorted-array","search-in-rotated-sorted-array","M"],
  ["Time Based Key Value Store","time-based-key-value-store","time-based-key-value-store","M"],
  ["Median of Two Sorted Arrays","median-of-two-sorted-arrays","median-of-two-sorted-arrays","H"],
  ["Reverse Linked List","reverse-a-linked-list","reverse-linked-list","E"],
  ["Merge Two Sorted Lists","merge-two-sorted-linked-lists","merge-two-sorted-lists","E"],
  ["Linked List Cycle","linked-list-cycle-detection","linked-list-cycle","E"],
  ["Reorder List","reorder-linked-list","reorder-list","M"],
  ["Remove Nth Node From End of List","remove-node-from-end-of-linked-list","remove-nth-node-from-end-of-list","M"],
  ["Copy List With Random Pointer","copy-linked-list-with-random-pointer","copy-list-with-random-pointer","M"],
  ["Add Two Numbers","add-two-numbers","add-two-numbers","M"],
  ["Find The Duplicate Number","find-duplicate-integer","find-the-duplicate-number","M"],
  ["LRU Cache","lru-cache","lru-cache","M"],
  ["Merge K Sorted Lists","merge-k-sorted-linked-lists","merge-k-sorted-lists","H"],
  ["Reverse Nodes In K Group","reverse-nodes-in-k-group","reverse-nodes-in-k-group","H"],
  ["Invert Binary Tree","invert-a-binary-tree","invert-binary-tree","E"],
  ["Maximum Depth of Binary Tree","depth-of-binary-tree","maximum-depth-of-binary-tree","E"],
  ["Diameter of Binary Tree","binary-tree-diameter","diameter-of-binary-tree","E"],
  ["Balanced Binary Tree","balanced-binary-tree","balanced-binary-tree","E"],
  ["Same Tree","same-binary-tree","same-tree","E"],
  ["Subtree of Another Tree","subtree-of-a-binary-tree","subtree-of-another-tree","E"],
  ["Lowest Common Ancestor of a Binary Search Tree","lowest-common-ancestor-in-binary-search-tree","lowest-common-ancestor-of-a-binary-search-tree","M"],
  ["Binary Tree Level Order Traversal","level-order-traversal-of-binary-tree","binary-tree-level-order-traversal","M"],
  ["Binary Tree Right Side View","binary-tree-right-side-view","binary-tree-right-side-view","M"],
  ["Count Good Nodes In Binary Tree","count-good-nodes-in-binary-tree","count-good-nodes-in-binary-tree","M"],
  ["Validate Binary Search Tree","valid-binary-search-tree","validate-binary-search-tree","M"],
  ["Kth Smallest Element In a Bst","kth-smallest-integer-in-bst","kth-smallest-element-in-a-bst","M"],
  ["Construct Binary Tree From Preorder And Inorder Traversal","binary-tree-from-preorder-and-inorder-traversal","construct-binary-tree-from-preorder-and-inorder-traversal","M"],
  ["Binary Tree Maximum Path Sum","binary-tree-maximum-path-sum","binary-tree-maximum-path-sum","H"],
  ["Serialize And Deserialize Binary Tree","serialize-and-deserialize-binary-tree","serialize-and-deserialize-binary-tree","H"],
  ["Kth Largest Element In a Stream","kth-largest-integer-in-a-stream","kth-largest-element-in-a-stream","E"],
  ["Last Stone Weight","last-stone-weight","last-stone-weight","E"],
  ["K Closest Points to Origin","k-closest-points-to-origin","k-closest-points-to-origin","M"],
  ["Kth Largest Element In An Array","kth-largest-element-in-an-array","kth-largest-element-in-an-array","M"],
  ["Task Scheduler","task-scheduling","task-scheduler","M"],
  ["Design Twitter","design-twitter-feed","design-twitter","M"],
  ["Find Median From Data Stream","find-median-in-a-data-stream","find-median-from-data-stream","H"],
  ["Subsets","subsets","subsets","M"],
  ["Combination Sum","combination-target-sum","combination-sum","M"],
  ["Combination Sum II","combination-target-sum-ii","combination-sum-ii","M"],
  ["Permutations","permutations","permutations","M"],
  ["Subsets II","subsets-ii","subsets-ii","M"],
  ["Generate Parentheses","generate-parentheses","generate-parentheses","M"],
  ["Word Search","search-for-word","word-search","M"],
  ["Palindrome Partitioning","palindrome-partitioning","palindrome-partitioning","M"],
  ["Letter Combinations of a Phone Number","combinations-of-a-phone-number","letter-combinations-of-a-phone-number","M"],
  ["N Queens","n-queens","n-queens","H"],
  ["Implement Trie Prefix Tree","implement-prefix-tree","implement-trie-prefix-tree","M"],
  ["Design Add And Search Words Data Structure","design-word-search-data-structure","design-add-and-search-words-data-structure","M"],
  ["Word Search II","search-for-word-ii","word-search-ii","H"],
  ["Number of Islands","count-number-of-islands","number-of-islands","M"],
  ["Max Area of Island","max-area-of-island","max-area-of-island","M"],
  ["Clone Graph","clone-graph","clone-graph","M"],
  ["Walls And Gates","islands-and-treasure","walls-and-gates","M"],
  ["Rotting Oranges","rotting-fruit","rotting-oranges","M"],
  ["Pacific Atlantic Water Flow","pacific-atlantic-water-flow","pacific-atlantic-water-flow","M"],
  ["Surrounded Regions","surrounded-regions","surrounded-regions","M"],
  ["Course Schedule","course-schedule","course-schedule","M"],
  ["Course Schedule II","course-schedule-ii","course-schedule-ii","M"],
  ["Graph Valid Tree","valid-tree","graph-valid-tree","M"],
  ["Number of Connected Components In An Undirected Graph","count-connected-components","number-of-connected-components-in-an-undirected-graph","M"],
  ["Redundant Connection","redundant-connection","redundant-connection","M"],
  ["Word Ladder","word-ladder","word-ladder","H"],
  ["Network Delay Time","network-delay-time","network-delay-time","M"],
  ["Reconstruct Itinerary","reconstruct-flight-path","reconstruct-itinerary","H"],
  ["Min Cost to Connect All Points","min-cost-to-connect-points","min-cost-to-connect-all-points","M"],
  ["Swim In Rising Water","swim-in-rising-water","swim-in-rising-water","H"],
  ["Alien Dictionary","foreign-dictionary","alien-dictionary","H"],
  ["Cheapest Flights Within K Stops","cheapest-flight-path","cheapest-flights-within-k-stops","M"],
  ["Climbing Stairs","climbing-stairs","climbing-stairs","E"],
  ["Min Cost Climbing Stairs","min-cost-climbing-stairs","min-cost-climbing-stairs","E"],
  ["House Robber","house-robber","house-robber","M"],
  ["House Robber II","house-robber-ii","house-robber-ii","M"],
  ["Longest Palindromic Substring","longest-palindromic-substring","longest-palindromic-substring","M"],
  ["Palindromic Substrings","palindromic-substrings","palindromic-substrings","M"],
  ["Decode Ways","decode-ways","decode-ways","M"],
  ["Coin Change","coin-change","coin-change","M"],
  ["Maximum Product Subarray","maximum-product-subarray","maximum-product-subarray","M"],
  ["Word Break","word-break","word-break","M"],
  ["Longest Increasing Subsequence","longest-increasing-subsequence","longest-increasing-subsequence","M"],
  ["Partition Equal Subset Sum","partition-equal-subset-sum","partition-equal-subset-sum","M"],
  ["Unique Paths","count-paths","unique-paths","M"],
  ["Longest Common Subsequence","longest-common-subsequence","longest-common-subsequence","M"],
  ["Best Time to Buy And Sell Stock With Cooldown","buy-and-sell-crypto-with-cooldown","best-time-to-buy-and-sell-stock-with-cooldown","M"],
  ["Coin Change II","coin-change-ii","coin-change-ii","M"],
  ["Target Sum","target-sum","target-sum","M"],
  ["Interleaving String","interleaving-string","interleaving-string","M"],
  ["Longest Increasing Path In a Matrix","longest-increasing-path-in-matrix","longest-increasing-path-in-a-matrix","H"],
  ["Distinct Subsequences","count-subsequences","distinct-subsequences","H"],
  ["Edit Distance","edit-distance","edit-distance","M"],
  ["Burst Balloons","burst-balloons","burst-balloons","H"],
  ["Regular Expression Matching","regular-expression-matching","regular-expression-matching","H"],
  ["Maximum Subarray","maximum-subarray","maximum-subarray","M"],
  ["Jump Game","jump-game","jump-game","M"],
  ["Jump Game II","jump-game-ii","jump-game-ii","M"],
  ["Gas Station","gas-station","gas-station","M"],
  ["Hand of Straights","hand-of-straights","hand-of-straights","M"],
  ["Merge Triplets to Form Target Triplet","merge-triplets-to-form-target","merge-triplets-to-form-target-triplet","M"],
  ["Partition Labels","partition-labels","partition-labels","M"],
  ["Valid Parenthesis String","valid-parenthesis-string","valid-parenthesis-string","M"],
  ["Insert Interval","insert-new-interval","insert-interval","M"],
  ["Merge Intervals","merge-intervals","merge-intervals","M"],
  ["Non Overlapping Intervals","non-overlapping-intervals","non-overlapping-intervals","M"],
  ["Meeting Rooms","meeting-schedule","meeting-rooms","E"],
  ["Meeting Rooms II","meeting-schedule-ii","meeting-rooms-ii","M"],
  ["Minimum Interval to Include Each Query","minimum-interval-including-query","minimum-interval-to-include-each-query","H"],
  ["Rotate Image","rotate-matrix","rotate-image","M"],
  ["Spiral Matrix","spiral-matrix","spiral-matrix","M"],
  ["Set Matrix Zeroes","set-zeroes-in-matrix","set-matrix-zeroes","M"],
  ["Happy Number","non-cyclical-number","happy-number","E"],
  ["Plus One","plus-one","plus-one","E"],
  ["Pow(x, n)","pow-x-n","powx-n","M"],
  ["Multiply Strings","multiply-strings","multiply-strings","M"],
  ["Detect Squares","count-squares","detect-squares","M"],
  ["Single Number","single-number","single-number","E"],
  ["Number of 1 Bits","number-of-one-bits","number-of-1-bits","E"],
  ["Counting Bits","counting-bits","counting-bits","E"],
  ["Reverse Bits","reverse-bits","reverse-bits","E"],
  ["Missing Number","missing-number","missing-number","E"],
  ["Sum of Two Integers","sum-of-two-integers","sum-of-two-integers","M"],
  ["Reverse Integer","reverse-integer","reverse-integer","M"],
];
const CO = ["Adobe","Affirm","Airbnb","Amazon","Apple","Atlassian","Block/Square","Bloomberg","ByteDance","Cisco","Citadel","Coinbase","Databricks","DoorDash","Dropbox","Expedia","Flipkart","Goldman Sachs","Google","IBM","Instacart","Intuit","Jane Street","LinkedIn","Lyft","Meta","Microsoft","Netflix","Nutanix","Nvidia","OpenAI","Oracle","Palantir","PayPal","Pinterest","Qualcomm","Robinhood","Roblox","Rubrik","Salesforce","Samsung","ServiceNow","Snap","Snowflake","Stripe","TikTok","Twitter/X","Two Sigma","Uber","Visa","Walmart","Wayfair","Yahoo","eBay"];
const CT = [
  [[2,15],[3,14],[11,4],[15,4],[32,4],[33,4],[39,4],[41,14],[59,4],[98,4],[130,4],[14,3],[18,3],[79,3],[122,3],[4,2],[13,2],[20,2],[27,2],[28,2],[30,2],[57,12],[83,2],[102,2],[105,2],[106,2],[124,12],[136,2],[6,1],[19,1],[51,1],[56,1],[71,1],[75,1],[100,1],[116,1],[123,1],[133,1],[135,1],[143,1],[149,1]],
  [[3,3],[1,2],[105,2]],
  [[0,3],[2,3],[13,3],[20,3],[39,3],[42,3],[78,3],[96,3],[97,3],[100,3],[120,3],[138,3],[143,3],[146,3],[18,2],[67,2]],
  [[2,15],[13,14],[14,14],[15,14],[41,14],[79,14],[3,13],[4,13],[8,13],[11,13],[12,13],[20,13],[28,13],[30,13],[32,13],[38,13],[39,13],[42,13],[71,13],[83,13],[86,13],[91,13],[102,13],[121,13],[130,13],[0,12],[1,12],[6,12],[7,12],[16,12],[18,12],[19,12],[21,12],[23,12],[25,12],[27,12],[33,12],[34,12],[43,12],[52,12],[57,12],[58,12],[62,12],[63,12],[65,12],[66,12],[72,12],[74,12],[75,12],[87,12],[98,12],[100,12],[105,12],[107,12],[110,12],[122,12],[123,12],[133,12],[135,12],[136,12],[143,12],[149,12],[9,11],[10,11],[17,11],[22,11],[26,11],[29,11],[31,11],[35,11],[36,11],[37,11],[40,11],[45,11],[46,11],[47,11],[48,11],[50,11],[51,11],[54,11],[55,11],[56,11],[61,11],[67,11],[69,11],[70,11],[73,11],[78,11],[84,11],[85,11],[97,11],[106,11],[108,11],[109,11],[114,11],[118,11],[120,11],[124,11],[137,11],[138,11],[139,11],[140,11],[147,11]],
  [[41,15],[2,14],[79,14],[130,14],[3,13],[4,13],[6,13],[7,13],[9,13],[14,13],[15,13],[20,3],[33,13],[62,13],[86,13],[87,13],[135,13],[11,12],[13,2],[21,2],[31,12],[32,12],[34,2],[42,12],[51,2],[65,12],[76,12],[91,12],[98,2],[107,2],[121,12],[133,12],[136,12],[144,2],[146,2],[149,12],[8,11],[10,1],[12,11],[30,1],[37,1],[45,1],[58,1],[63,11],[71,1],[74,11],[102,11],[120,1],[122,1],[132,11]],
  [[130,14],[133,3],[72,12],[3,1],[4,1],[8,1],[14,11]],
  [[107,5],[108,4],[5,2]],
  [[2,15],[14,14],[15,14],[20,14],[39,14],[79,14],[130,14],[1,13],[3,13],[8,13],[11,13],[12,13],[13,13],[21,13],[30,13],[32,13],[34,13],[41,13],[66,13],[72,13],[102,13],[121,13],[149,13],[0,12],[6,12],[9,12],[16,12],[28,12],[33,12],[42,12],[51,12],[54,12],[71,12],[73,12],[98,12],[100,12],[105,12],[107,12],[122,12],[133,12],[135,12],[136,12],[137,12],[139,12],[140,12],[143,12],[4,11],[7,11],[10,11],[19,11],[22,11],[23,11],[25,11],[26,11],[27,11],[35,11],[36,11],[37,11],[38,11],[40,11],[43,11],[45,11],[46,11],[47,11],[48,11],[50,11],[55,1],[56,11],[58,1],[62,11],[67,11],[69,11],[70,11],[74,11],[75,11],[76,11],[83,11],[86,1],[91,11],[106,11],[108,11],[109,1],[110,11],[118,11],[120,11],[123,11],[124,11],[138,11],[147,11]],
  [[41,15],[67,3],[79,13],[86,3],[130,3],[2,2],[4,2],[13,2],[14,2],[30,2],[39,2],[68,2],[83,2],[91,2],[100,2],[108,12],[111,2],[120,2],[121,2],[141,2],[16,1],[19,1],[20,1],[42,1],[62,1],[66,1],[81,1],[98,1],[102,1],[110,1],[122,1]],
  [[100,5],[102,5],[78,4],[135,4],[136,3],[15,2],[20,2],[39,2],[41,2],[118,2],[121,2],[2,1],[35,1],[79,1],[130,1],[138,1]],
  [[19,5],[103,5],[14,4],[41,4],[65,14],[130,4],[40,3],[3,2],[22,12],[31,12],[42,2],[57,2],[58,2],[79,2],[87,2],[91,12],[93,2],[2,1],[13,1],[21,1],[28,1],[54,1],[67,1],[69,1],[72,1],[74,1],[76,1],[86,1],[98,1],[102,1],[121,1],[133,1],[140,1]],
  [[31,4],[14,1],[87,1]],
  [[31,14],[100,14],[101,3],[17,1]],
  [[82,15],[57,4],[116,14],[28,3],[2,1],[25,1],[58,1],[76,1],[80,1],[87,1],[111,1]],
  [[2,5],[32,5],[74,5],[130,2]],
  [[2,13],[3,13],[19,13],[20,3],[41,13],[130,13],[13,2],[14,2],[15,2],[79,2],[100,12],[12,1],[28,11],[30,1],[54,1],[55,1],[71,1],[74,1],[80,11],[83,1],[91,1],[97,1]],
  [[2,3],[12,3],[13,3],[25,3],[28,3],[83,13],[124,3],[30,2],[65,2],[84,12],[110,2],[11,1],[14,1],[42,1],[62,1],[71,1],[86,1],[97,1],[118,1],[135,1]],
  [[13,15],[32,13],[3,12],[12,12],[15,12],[30,12],[41,12],[79,12],[104,2],[130,12],[2,1],[4,11],[14,11],[29,1],[62,1],[121,11]],
  [[2,15],[8,13],[11,13],[13,13],[14,13],[15,13],[32,13],[39,13],[102,13],[4,12],[12,12],[20,12],[25,12],[28,12],[30,12],[33,12],[34,12],[41,12],[71,12],[74,12],[75,12],[79,12],[98,12],[121,12],[122,12],[130,12],[133,12],[136,12],[143,12],[149,12],[0,11],[1,11],[3,11],[6,11],[7,11],[9,11],[10,11],[16,11],[19,11],[21,11],[23,11],[26,11],[35,11],[37,11],[40,11],[42,11],[43,11],[46,11],[48,11],[57,11],[62,11],[65,11],[66,11],[67,11],[69,11],[70,11],[73,11],[83,11],[86,11],[100,11],[105,11],[106,11],[107,11],[108,11],[109,11],[110,11],[118,11],[120,11],[123,11],[129,11],[135,11],[137,11],[138,11],[139,11],[140,11],[147,11]],
  [[2,14],[14,14],[15,14],[130,14],[20,13],[135,13],[1,2],[3,2],[11,2],[74,2],[102,12],[0,1],[8,1],[12,1],[18,1],[19,1],[41,11],[54,1],[62,11],[98,1],[121,1],[131,11],[133,11],[136,1]],
  [[31,4],[3,12]],
  [[20,15],[41,3],[80,3],[83,3],[105,13],[107,13],[139,3],[2,2],[87,2],[3,1],[9,1],[23,1],[71,1],[100,1],[103,11],[130,1]],
  [[41,3],[2,2],[20,2],[39,12]],
  [[20,13],[74,13],[79,13],[91,13],[106,13],[121,13],[140,3],[18,2],[30,12],[41,12],[45,12],[50,2],[58,2],[62,12],[69,2],[130,2],[2,1],[6,1],[22,1],[34,1],[42,1],[51,1],[87,11],[88,1],[100,1],[103,1],[118,1],[129,1]],
  [[83,15],[18,14],[31,14],[21,12],[104,2],[6,1],[8,1],[15,1],[133,1]],
  [[2,14],[9,14],[14,14],[46,14],[52,14],[62,14],[130,14],[140,14],[4,13],[11,13],[18,13],[20,13],[38,13],[39,13],[41,13],[42,13],[61,13],[81,13],[3,12],[8,12],[12,12],[13,12],[15,12],[28,12],[30,12],[32,12],[34,12],[37,12],[66,12],[71,12],[74,12],[79,12],[86,12],[91,12],[98,12],[102,12],[103,12],[121,12],[0,11],[1,11],[6,11],[10,11],[16,11],[19,11],[23,11],[25,11],[33,11],[50,1],[51,1],[54,11],[57,11],[65,1],[67,11],[72,11],[73,11],[75,11],[80,11],[87,11],[96,1],[105,11],[107,1],[110,11],[114,1],[116,1],[120,11],[122,11],[133,11],[135,11],[136,11],[137,11],[139,11],[141,1],[149,11]],
  [[2,15],[3,13],[11,13],[12,13],[13,13],[14,13],[15,13],[20,13],[30,13],[32,13],[39,13],[41,13],[79,13],[102,13],[121,13],[130,13],[0,12],[1,12],[6,12],[8,12],[9,12],[21,12],[28,12],[33,12],[34,12],[38,12],[42,12],[43,12],[58,12],[62,12],[69,12],[71,12],[72,12],[74,12],[75,12],[98,12],[100,12],[122,12],[133,12],[135,12],[136,12],[137,12],[140,12],[149,12],[4,11],[7,11],[10,11],[16,11],[17,11],[18,11],[19,11],[23,11],[25,11],[26,11],[27,11],[29,1],[35,11],[36,11],[37,11],[40,11],[45,11],[50,11],[51,11],[54,11],[57,11],[63,11],[65,11],[66,11],[67,11],[73,11],[76,11],[78,11],[83,11],[86,11],[87,11],[91,11],[101,1],[104,11],[105,11],[106,11],[107,11],[108,11],[110,11],[111,11],[118,11],[120,11],[123,11],[124,11],[138,11],[139,11],[143,11],[147,11]],
  [[15,14],[31,14],[87,14],[93,4],[130,4],[133,4],[0,3],[72,3],[92,3],[4,2],[28,2],[41,12],[107,2],[1,1]],
  [[24,5],[41,14],[130,4],[3,3],[19,3],[135,3],[15,2],[27,2],[30,2],[46,2],[57,2],[58,2],[63,2],[87,2],[116,2],[136,2],[4,1],[11,1],[13,1],[42,1],[79,1],[81,1],[84,1],[85,1],[94,1],[107,1],[123,1],[133,1],[137,1]],
  [[14,14],[15,14],[41,14],[2,13],[3,13],[20,13],[30,3],[42,13],[60,3],[79,3],[121,3],[4,2],[6,2],[12,2],[13,2],[19,12],[33,2],[38,12],[40,2],[130,2],[146,2],[147,2],[1,1],[8,11],[11,1],[21,11],[28,11],[35,1],[39,1],[58,1],[62,1],[71,1],[83,1],[86,1],[87,1],[98,1],[100,11],[108,1],[110,1],[122,1],[135,1],[136,1],[137,1],[145,1]],
  [[5,4],[31,3],[83,13],[13,1]],
  [[41,15],[2,14],[15,4],[79,14],[3,13],[4,3],[19,3],[20,13],[42,3],[130,3],[133,13],[136,3],[1,2],[8,2],[11,2],[12,12],[13,12],[14,2],[21,2],[28,12],[30,12],[33,2],[52,12],[71,2],[83,2],[102,2],[121,2],[6,1],[9,1],[18,11],[27,1],[31,11],[32,1],[38,1],[46,11],[51,1],[54,1],[55,1],[57,1],[62,1],[63,1],[65,1],[74,1],[75,1],[76,1],[86,1],[87,11],[91,1],[103,1],[105,11],[108,1],[124,1]],
  [[0,2],[41,2],[143,2],[31,1],[42,1],[87,1],[130,1]],
  [[41,4],[108,14],[2,3],[3,3],[6,3],[72,3],[79,3],[105,3],[130,3],[4,12],[7,2],[8,2],[14,2],[15,2],[30,2],[60,2],[65,2],[100,2],[103,2],[121,2],[12,1],[13,1],[20,1],[28,1],[66,1],[136,1]],
  [[93,15],[105,13],[65,2],[114,2],[4,1],[67,1],[141,11]],
  [[2,14],[15,14],[33,4],[41,14],[43,14],[79,14],[11,3],[20,13],[35,3],[37,3],[135,3],[146,3],[13,2],[98,2],[140,2],[12,1],[32,1],[34,1],[42,1],[45,1],[58,1],[62,1],[69,1],[71,1],[87,1],[106,1],[110,11],[118,1],[130,1],[143,1],[144,1],[145,1],[149,1]],
  [[4,3],[14,2]],
  [[63,4],[87,4],[135,3],[20,2],[76,2],[86,2],[2,1],[13,1],[25,1],[130,1],[136,1]],
  [[41,1],[63,1]],
  [[3,12],[15,2],[41,12],[79,2],[87,12],[103,2],[117,2],[130,12],[2,1],[4,1],[13,1],[14,1],[18,1],[21,1],[28,1],[43,1],[57,1],[62,1],[72,1],[102,1],[111,1]],
  [[41,15],[79,5],[108,5],[119,5],[13,4],[2,3],[11,2],[14,2],[42,2],[71,2],[83,2],[20,1],[30,1],[32,1],[69,1],[72,1],[91,1],[102,1],[118,1],[121,1],[123,1],[130,1],[135,1]],
  [[15,5],[41,5],[13,4],[71,4],[79,4],[12,3],[16,3],[19,3],[20,3],[84,3],[2,2],[3,2],[14,2],[34,2],[62,2],[83,2],[102,2],[105,2],[121,2],[123,2],[137,2],[4,1],[6,1],[23,1],[32,1],[33,1],[52,1],[67,1],[74,1],[91,1],[101,1],[106,1],[111,1],[114,1],[124,1],[130,1],[140,1]],
  [[41,15],[79,15],[133,15],[7,4],[18,4],[21,4],[33,4],[67,4],[68,4],[91,4],[96,4],[119,4],[4,13],[87,3],[72,2],[104,2],[130,2],[3,1],[36,1],[78,1],[86,1]],
  [[87,15],[138,15],[13,14],[18,4],[78,4],[42,3],[2,2],[4,12],[21,2],[31,2],[34,2],[38,2],[41,2],[63,2],[77,12],[80,12],[86,12],[83,1],[88,11],[97,1],[120,1]],
  [[97,3],[130,2]],
  [[41,15],[79,15],[13,4],[15,4],[86,14],[87,4],[108,4],[130,14],[133,14],[4,13],[11,3],[18,3],[30,13],[72,13],[75,3],[102,3],[105,3],[136,13],[2,2],[8,2],[14,12],[20,2],[23,2],[33,2],[36,2],[42,2],[52,2],[56,2],[57,12],[58,12],[62,12],[65,2],[71,2],[78,2],[80,2],[91,2],[98,2],[100,2],[116,2],[118,2],[128,2],[3,1],[12,1],[19,1],[25,1],[28,1],[29,1],[43,11],[66,11],[67,1],[69,1],[77,1],[82,1],[83,1],[84,1],[94,1],[96,1],[97,11],[107,1],[109,1],[120,1],[121,1],[122,11],[123,1],[124,11],[132,1],[141,11]],
  [[13,5],[20,5],[33,5],[41,5],[42,5],[50,5],[64,5],[76,5],[89,5],[96,5],[120,5],[130,5],[138,5],[141,5]],
  [[141,14],[78,3],[20,12],[42,2],[79,1],[133,1]],
  [[96,15],[55,14],[79,14],[6,3],[14,13],[41,13],[72,13],[78,13],[1,2],[2,2],[3,2],[4,2],[7,2],[18,2],[30,12],[42,2],[58,12],[74,2],[86,12],[87,12],[107,2],[133,12],[136,2],[9,1],[19,1],[21,1],[25,1],[28,1],[31,11],[33,1],[38,1],[45,1],[52,1],[65,11],[66,1],[67,1],[71,1],[76,1],[81,1],[83,11],[91,1],[104,1],[105,1],[120,1],[138,1]],
  [[2,15],[15,15],[11,14],[14,14],[41,14],[3,13],[13,3],[20,3],[25,3],[79,13],[102,13],[121,3],[130,13],[33,2],[82,2],[135,2],[136,2],[4,11],[6,1],[12,1],[34,1],[46,1],[47,1],[65,1],[73,11],[86,1],[91,1],[124,1],[138,1]],
  [[2,15],[15,15],[20,5],[41,5],[79,15],[3,14],[13,14],[30,4],[71,4],[130,14],[8,3],[12,13],[67,3],[102,3],[105,3],[107,3],[108,3],[4,2],[7,2],[11,12],[14,12],[17,12],[32,2],[42,2],[52,2],[62,2],[65,2],[70,2],[83,2],[86,12],[103,2],[121,2],[136,2],[137,2],[9,1],[18,1],[21,1],[23,1],[25,1],[27,1],[29,1],[37,1],[43,1],[100,1],[104,1],[129,1],[133,1]],
  [[3,2],[9,2],[19,2]],
  [[0,5],[2,5],[32,5],[33,5],[35,5],[41,5],[45,5],[58,5],[107,5],[4,3],[67,2],[20,1],[30,1],[54,1],[72,1],[133,1],[136,1]],
  [[41,15],[2,14],[49,4],[109,4],[136,4],[3,3],[4,13],[20,3],[31,3],[79,3],[86,3],[91,3],[102,3],[130,13],[137,3],[140,3],[11,12],[15,2],[62,2],[72,2],[83,2],[93,2],[115,2],[123,2],[6,1],[42,1],[65,1],[71,1],[81,1],[82,1],[96,1]],
];

const BY_NAME = {};
RAW.forEach(([name, n, l, d]) => {
  BY_NAME[name] = {
    name,
    diff: d,
    neet: "https://neetcode.io/problems/" + n + "?list=neetcode150",
    leet: "https://leetcode.com/problems/" + l + "/",
  };
});
const P = (name) => BY_NAME[name] || { name, diff: "M", neet: "https://neetcode.io/practice", leet: "" };

/* Seeded from your screenshot. Every box is editable — fix any I misread. */
/* Problems to pre-tick as solved for a first-time visitor. Empty by default so
   everyone starts from zero; add exact problem names here to fork the app with
   your own history already filled in. */
const ALREADY_SOLVED = [];

const PHASES = [
  { id: 1, name: "All 21 patterns, fast", months: "Month 1", weeks: "Weeks 1–4" },
  { id: 2, name: "Arrays through heaps", months: "Month 2", weeks: "Weeks 5–8" },
  { id: 3, name: "Trees, end to end", months: "Month 3", weeks: "Weeks 9–12" },
  { id: 4, name: "Graphs & search", months: "Month 4", weeks: "Weeks 13–16" },
  { id: 5, name: "DP, greedy, intervals", months: "Month 5", weeks: "Weeks 17–21" },
  { id: 6, name: "Interview shape", months: "Month 6", weeks: "Weeks 22–24" },
];

const MODULES = [
  /* ============================ PHASE 1 ============================ */
  {
    id: "m1", week: 1, phase: 1,
    title: "Hashing as memory",
    tag: "Arrays & Hashing",
    lesson: {
      big: "A hash map converts the question \"have I seen this before?\" from an O(n) scan into an O(1) lookup. Almost every array problem that looks like it needs nested loops is really asking: what would I need to have already written down so that one pass is enough? Answer that, and the code writes itself.",
      triggers: [
        "\"count of\", \"frequency\", \"how many times\"",
        "\"pair / triplet that sums to X\" on an UNSORTED array",
        "\"group by some property\" — the property becomes the key",
        "\"has this appeared before\" or dedupe",
        "You catch yourself writing a nested loop over the same array",
      ],
      code: {
        title: "One-pass complement lookup (Two Sum)",
        body: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>(); // value -> index
    for (int i = 0; i < nums.length; i++) {
        int need = target - nums[i];
        if (seen.containsKey(need)) {
            return new int[]{ seen.get(need), i };
        }
        seen.put(nums[i], i);       // store AFTER checking
    }
    return new int[]{};
}`,
      },
      cost: "O(n) time, O(n) space. You are trading memory for a loop — say that trade out loud in an interview.",
      traps: [
        "Storing before checking. Put the current element in the map only after you look for its partner, or a single element pairs with itself.",
        "Bad key design. For Group Anagrams, a 26-length count array turned into a string is an O(len) key; sorting each word is O(len log len). Both pass, one is better.",
        "Product of Array Except Self bans division for a reason — the intended answer is a prefix pass and a suffix pass, not a division trick that dies on zeros.",
        "Longest Consecutive Sequence is O(n) only if you start counting from numbers that have no left neighbour. Without that check it is quietly O(n²).",
      ],
    },
    quiz: [
      {
        q: "For Group Anagrams, which key makes the grouping fastest for long words?",
        opts: [
          "The word sorted alphabetically",
          "A 26-slot character count, serialized",
          "The word's hash code",
          "The word's length",
        ],
        a: 1,
        why: "Sorting is O(L log L) per word; a character-count key is O(L). Length alone is not unique, and a raw hash code collides.",
      },
      {
        q: "Longest Consecutive Sequence: what single check keeps the solution linear?",
        opts: [
          "Sort the array first",
          "Only start counting up from a number whose predecessor is absent",
          "Use a TreeSet instead of a HashSet",
          "Break as soon as you find a duplicate",
        ],
        a: 1,
        why: "Each run is walked exactly once, from its lowest element. Without the predecessor check you re-walk the same run from every member of it.",
      },
      {
        q: "You are told the input array is sorted and you need a pair summing to a target. What changes?",
        opts: [
          "Nothing — hash map is still optimal",
          "Two pointers gives the same time with O(1) extra space",
          "Binary search each complement, O(n log n)",
          "You must sort it again to be safe",
        ],
        a: 1,
        why: "Sorted input unlocks converging pointers: same O(n) time but constant space. Noticing 'sorted' in the prompt is worth real points.",
      },
    ],
    probs: ["Contains Duplicate", "Valid Anagram", "Two Sum", "Group Anagrams", "Top K Frequent Elements", "Encode and Decode Strings", "Product of Array Except Self", "Valid Sudoku", "Longest Consecutive Sequence"],
  },

  {
    id: "m2", week: 2, phase: 1,
    title: "Two pointers",
    tag: "Two Pointers",
    lesson: {
      big: "Two indices that only ever move toward each other. The power is not the pointers, it is the argument that lets you move one: every move must let you discard a whole region of the search space and prove nothing was lost. If you cannot state that argument, you do not have a two-pointer solution — you have a guess.",
      triggers: [
        "The input is sorted, or you are allowed to sort it",
        "Palindromes, or anything symmetric",
        "\"Find a pair / triplet\", \"maximum area\", \"container\"",
        "\"In place\" with O(1) extra space",
      ],
      code: {
        title: "Converging pointers with duplicate skipping (3Sum core)",
        body: `Arrays.sort(nums);
for (int i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue;   // skip dup anchors
    int l = i + 1, r = nums.length - 1;
    while (l < r) {
        int sum = nums[i] + nums[l] + nums[r];
        if (sum < 0) l++;
        else if (sum > 0) r--;
        else {
            res.add(List.of(nums[i], nums[l], nums[r]));
            l++;
            while (l < r && nums[l] == nums[l - 1]) l++; // skip dup lefts
        }
    }
}`,
      },
      cost: "O(n) for a single sweep; O(n²) for 3Sum because of the outer anchor loop. Sorting is O(n log n) and is usually free in comparison.",
      traps: [
        "Container With Most Water: always move the SHORTER line. Moving the taller one can never increase the area, because width shrinks and height is capped by the shorter side.",
        "3Sum duplicate handling has two places, not one: the anchor and the left pointer after a hit.",
        "Trapping Rain Water is two pointers plus a running max on each side — water above a bar is min(maxLeft, maxRight) - height.",
        "Valid Palindrome: normalise case and skip non-alphanumerics inside the pointer loop, not with a pre-built string, if they ask for O(1) space.",
      ],
    },
    quiz: [
      {
        q: "Container With Most Water — the left line is height 8, the right is height 3. Which pointer moves?",
        opts: ["Left", "Right", "Whichever is closer to the middle", "Both simultaneously"],
        a: 1,
        why: "Move the shorter one (the right, height 3). Area is capped by the shorter line, and width only ever decreases, so keeping the short line cannot help.",
      },
      {
        q: "Why does 3Sum sort the array first, given sorting costs O(n log n)?",
        opts: [
          "To make the output sorted as required",
          "So the sum becomes monotonic in the pointer moves, and duplicates land adjacent",
          "To let you binary search the third number",
          "Sorting is not actually necessary",
        ],
        a: 1,
        why: "Sorting buys two things at once: moving l up strictly increases the sum, and identical values sit next to each other so dedupe is a neighbour check.",
      },
      {
        q: "Trapping Rain Water, two-pointer version: water trapped above index i equals…",
        opts: [
          "max(leftMax, rightMax) - height[i]",
          "min(leftMax, rightMax) - height[i]",
          "leftMax + rightMax - 2 * height[i]",
          "height[i] - min(leftMax, rightMax)",
        ],
        a: 1,
        why: "Water spills over the lower of the two walls, so the shorter wall sets the level. Clamp at zero when the bar is taller than that level.",
      },
    ],
    probs: ["Valid Palindrome", "Two Sum II Input Array Is Sorted", "3Sum", "Container With Most Water", "Trapping Rain Water"],
  },

  {
    id: "m3", week: 3, phase: 1,
    title: "Sliding window",
    tag: "Sliding Window",
    lesson: {
      big: "Keep a window [l, r] and one invariant you refuse to break. The right edge expands to take in new elements; the left edge contracts while the invariant is violated. Every index enters once and leaves once, so the whole thing is O(n) even though it looks like a nested loop. Write the invariant as a sentence before you write any code.",
      triggers: [
        "\"longest / shortest substring or subarray such that…\"",
        "\"at most K distinct\", \"at most K replacements\"",
        "\"contains all characters of\"",
        "Fixed-size window: \"of size k\"",
        "Contiguous. If the problem allows skipping elements, it is not a window.",
      ],
      code: {
        title: "Variable window skeleton",
        body: `int l = 0, best = 0;
Map<Character, Integer> count = new HashMap<>();
for (int r = 0; r < s.length(); r++) {
    count.merge(s.charAt(r), 1, Integer::sum);      // expand

    while (count.get(s.charAt(r)) > 1) {            // WHILE, not IF: shrink till valid
        char out = s.charAt(l);
        count.merge(out, -1, Integer::sum);
        if (count.get(out) == 0) count.remove(out);
        l++;                                        // contract
    }
    best = Math.max(best, r - l + 1);               // window is valid here
}
return best;`,
      },
      cost: "O(n) time. Space is O(k) where k is the alphabet or the number of distinct elements allowed.",
      traps: [
        "Using `if` instead of `while` to shrink. One removal is often not enough to restore the invariant.",
        "Recording the answer in the wrong place. For a LONGEST problem, record after shrinking (window is valid). For a SHORTEST problem, record inside the shrink loop (window is minimal).",
        "Longest Repeating Character Replacement: you do not need to recompute the max frequency after shrinking. A stale max only ever makes the window refuse to grow, which is harmless.",
        "Minimum Window Substring needs a 'how many required chars are satisfied' counter, not a full map comparison on every step.",
        "Sliding Window Maximum is a window plus a monotonic deque, not a plain window. It is the bridge to next week.",
      ],
    },
    quiz: [
      {
        q: "For a 'longest valid window' problem, where do you update the answer?",
        opts: [
          "Inside the shrink loop, before moving l",
          "After the shrink loop, when the window is valid again",
          "Only once, after the outer loop finishes",
          "Every time r moves, regardless of validity",
        ],
        a: 1,
        why: "After shrinking, the window satisfies the invariant and is as large as it can be for this r. For shortest-window problems it is the opposite: record inside the loop.",
      },
      {
        q: "Why is a sliding window O(n) despite having a loop inside a loop?",
        opts: [
          "The inner loop runs at most a constant number of times",
          "l only ever increases, so it moves at most n times across the whole run",
          "The window size is bounded by the alphabet",
          "It isn't — it is O(n²) in the worst case",
        ],
        a: 1,
        why: "Amortised analysis: l never resets or moves backwards. Total work is bounded by n moves of r plus n moves of l.",
      },
      {
        q: "Which of these is NOT a sliding window problem?",
        opts: [
          "Longest substring without repeating characters",
          "Minimum window substring",
          "Longest increasing subsequence",
          "Permutation in string",
        ],
        a: 2,
        why: "LIS allows skipping elements, so the answer is not contiguous. Windows only work on contiguous ranges — that is the first thing to check.",
      },
    ],
    probs: ["Best Time to Buy And Sell Stock", "Longest Substring Without Repeating Characters", "Longest Repeating Character Replacement", "Permutation In String", "Minimum Window Substring", "Sliding Window Maximum"],
  },

  {
    id: "m4", week: 4, phase: 1,
    title: "Monotonic stack",
    tag: "Stack",
    lesson: {
      big: "A stack of candidates that have not yet been beaten. You push things whose answer is still unknown; when a new element arrives that beats them, they pop and their answer is resolved at that exact moment. This is the tool for every 'next greater / next smaller / how far until' question, and it is the single most under-practised pattern at the mid level.",
      triggers: [
        "\"next greater element\", \"days until a warmer temperature\"",
        "\"how far can I see\", spans, histograms",
        "Matching or nesting: parentheses, expressions",
        "You want, for each index, something about the nearest index on one side that satisfies a comparison",
      ],
      code: {
        title: "Next greater element — decreasing stack of INDICES",
        body: `int[] res = new int[temps.length];
Deque<Integer> stack = new ArrayDeque<>();     // holds indices
for (int i = 0; i < temps.length; i++) {
    while (!stack.isEmpty() && temps[i] > temps[stack.peek()]) {
        int j = stack.pop();
        res[j] = i - j;                        // resolved right now
    }
    stack.push(i);
}
// anything left in the stack never found a greater element -> stays 0`,
      },
      cost: "O(n): each index is pushed once and popped at most once. Space O(n).",
      traps: [
        "Storing values instead of indices. You almost always need the distance or width, which requires the index.",
        "Forgetting the leftovers. After the loop, whatever is still on the stack has no answer — decide what that means for your problem.",
        "Largest Rectangle in Histogram: when a bar pops, its rectangle extends left to the index below it on the stack, not to the popped index. Getting this width right is the whole problem.",
        "Car Fleet: sort by position descending, then a stack of arrival times — a car joins the fleet ahead if it would arrive no later.",
        "Min Stack needs a second stack (or pairs) so getMin stays O(1); do not scan on every call.",
      ],
    },
    quiz: [
      {
        q: "Daily Temperatures uses a stack that is monotonically…",
        opts: ["increasing from bottom to top", "decreasing from bottom to top", "sorted by index", "unordered"],
        a: 1,
        why: "Bottom holds the largest unresolved temperature. A new warmer day pops everything cooler than it, resolving those days.",
      },
      {
        q: "In Largest Rectangle in Histogram, when index j pops, the rectangle's left boundary is…",
        opts: [
          "j itself",
          "The index now on top of the stack, plus one",
          "Always index 0",
          "The previous popped index",
        ],
        a: 1,
        why: "Everything between the new stack top and the current index was taller than height[j], so the bar at j extends left until that shorter bar blocks it.",
      },
      {
        q: "What makes Min Stack's getMin O(1)?",
        opts: [
          "Sorting the stack on push",
          "Pushing the running minimum alongside each value",
          "Using a PriorityQueue internally",
          "Caching the min and recomputing after pop",
        ],
        a: 1,
        why: "Each entry carries the minimum of the stack at the moment it was pushed, so popping restores the previous minimum for free.",
      },
    ],
    probs: ["Valid Parentheses", "Min Stack", "Evaluate Reverse Polish Notation", "Daily Temperatures", "Car Fleet", "Largest Rectangle In Histogram"],
  },

  /* ============================ PHASE 2 ============================ */
  {
    id: "m5", week: 5, phase: 2,
    title: "Binary search on the answer",
    tag: "Binary Search",
    lesson: {
      big: "Your notes say binary search applies to sorted arrays. Upgrade that: binary search applies to any monotonic predicate. If you can write a boolean f(x) whose values look like false, false, …, false, true, true, …, true, you can find the boundary in O(log range) — even when there is no array in sight. \"Minimum capacity such that we finish in time\" is the same search as \"index of target\".",
      triggers: [
        "\"minimum X such that…\" or \"maximum X such that…\"",
        "Sorted, or rotated-sorted, or a matrix sorted row-wise",
        "The answer lives in a numeric range and checking a candidate is cheap",
        "The brute force is 'try every speed / size / capacity from 1 to N'",
      ],
      code: {
        title: "Boundary search — no off-by-one, no equality case",
        body: `int lo = 1, hi = maxPossible;          // search the ANSWER space
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;      // your overflow-safe midpoint
    if (feasible(mid)) hi = mid;       // mid might be the answer, keep it
    else               lo = mid + 1;   // mid is definitely too small
}
return lo;                             // lo == hi == smallest feasible x

// Koko: feasible(speed) = sum over piles of ceil(pile / speed) <= h`,
      },
      cost: "O(log(range) × cost of feasible). For Koko that is O(n log(maxPile)).",
      traps: [
        "`while (lo < hi)` with `hi = mid` never loops forever. `while (lo <= hi)` with `hi = mid` does. Pick one template and always use it.",
        "Rotated arrays: decide which half is sorted first (compare nums[lo] to nums[mid]), then ask whether the target lies inside that sorted half.",
        "Search a 2D Matrix is just binary search over index 0..rows*cols-1, mapping i to (i / cols, i % cols).",
        "Median of Two Sorted Arrays binary searches the PARTITION point of the shorter array, not the values. Save it for week 23 if it stalls you.",
        "Time Based Key Value Store: binary search for the largest timestamp ≤ target, which is the upper-bound variant.",
      ],
    },
    quiz: [
      {
        q: "Koko Eating Bananas: what exactly is being binary searched?",
        opts: [
          "The pile sizes after sorting",
          "The eating speed, over the range 1..max(pile)",
          "The number of hours",
          "The index of the largest pile",
        ],
        a: 1,
        why: "There is no sorted array to search. The monotonic predicate is 'can she finish at speed k' — false for small k, true for large k. You want the boundary.",
      },
      {
        q: "In Search in Rotated Sorted Array, the first comparison you make on each iteration is:",
        opts: [
          "nums[mid] vs target",
          "nums[lo] vs nums[mid], to find which half is sorted",
          "nums[mid] vs nums[hi - 1]",
          "lo vs hi",
        ],
        a: 1,
        why: "Exactly one half is always properly sorted. Identify it, check if the target falls inside its range, and discard the other half.",
      },
      {
        q: "Which loop shape can spin forever?",
        opts: [
          "while (lo < hi) { mid = lo + (hi-lo)/2; if (ok) hi = mid; else lo = mid+1; }",
          "while (lo < hi) { mid = lo + (hi-lo)/2; if (ok) hi = mid-1; else lo = mid; }",
          "while (lo <= hi) { ... hi = mid-1 ... lo = mid+1 }",
          "None of these",
        ],
        a: 1,
        why: "With lo = mid and integer division rounding down, mid can equal lo when hi = lo+1, so lo never advances. If you ever set lo = mid, the midpoint must round up.",
      },
    ],
    probs: ["Binary Search", "Search a 2D Matrix", "Koko Eating Bananas", "Find Minimum In Rotated Sorted Array", "Search In Rotated Sorted Array", "Time Based Key Value Store", "Median of Two Sorted Arrays"],
  },

  {
    id: "m6", week: 6, phase: 2,
    title: "Linked list: three tools",
    tag: "Linked List",
    lesson: {
      big: "You already have the dummy node. Add two more and you can solve essentially every list problem: the fast/slow pair (finds middles and cycles) and in-place reversal (three pointers, prev / cur / next). Most medium list problems are a composition of these three — Reorder List is literally find middle, reverse second half, weave.",
      triggers: [
        "Head might be deleted or the list might be built from nothing → dummy",
        "\"middle\", \"cycle\", \"nth from the end\" → two pointers at different speeds",
        "\"reverse\", \"reorder\", \"k at a time\" → in-place reversal",
        "\"O(1) space\" is stated explicitly → you cannot copy to an array",
      ],
      code: {
        title: "The three tools",
        body: `// 1. Dummy — deletion without a special case for the head
ListNode dummy = new ListNode(0, head);
ListNode prev = dummy;

// 2. Fast / slow — slow lands on the middle; they meet iff there is a cycle
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}

// 3. In-place reversal
ListNode prev2 = null, cur = head;
while (cur != null) {
    ListNode nxt = cur.next;   // save BEFORE you overwrite
    cur.next = prev2;
    prev2 = cur;
    cur = nxt;
}
return prev2;                  // new head`,
      },
      cost: "All three are O(n) time, O(1) space. Recursion on a list is O(n) stack — mention that if they ask about a 100k-node list.",
      traps: [
        "Losing `cur.next` during reversal. Save it first, always.",
        "Floyd's cycle detection has a second phase: after the meeting, reset one pointer to the head and advance both one step at a time. They meet at the cycle entrance. Find The Duplicate Number is this exact algorithm on an array treated as a linked list.",
        "Remove Nth From End: advance fast by n+1 from the DUMMY, not from head, so slow stops one before the target.",
        "LRU Cache is a HashMap plus a doubly linked list with dummy head and tail. Both dummies are what make the pointer surgery bug-free.",
        "Merge K Sorted Lists: a min-heap of the k current heads gives O(n log k), or merge pairwise in log k rounds.",
      ],
    },
    quiz: [
      {
        q: "After fast and slow meet inside a cycle, how do you find the node where the cycle begins?",
        opts: [
          "The meeting point is the cycle start",
          "Reset one pointer to head, then advance both one step at a time until they meet",
          "Count the cycle length, then advance a pointer by that much",
          "You cannot, without extra space",
        ],
        a: 1,
        why: "Floyd's second phase. The distance from head to the entrance equals the distance from the meeting point to the entrance, going around.",
      },
      {
        q: "Reorder List decomposes into which three steps?",
        opts: [
          "Reverse, sort, merge",
          "Find middle, reverse the second half, weave the two halves",
          "Copy to array, shuffle, rebuild",
          "Split by parity, reverse, concatenate",
        ],
        a: 1,
        why: "Each step is one of your three tools. Recognising a composite problem as a pipeline of known steps is the skill being tested.",
      },
      {
        q: "Why does LRU Cache need a DOUBLY linked list rather than a singly linked one?",
        opts: [
          "To iterate in both directions for the API",
          "So a node found via the hash map can be unlinked in O(1) without finding its predecessor",
          "Because the capacity can change",
          "It doesn't — singly linked works fine",
        ],
        a: 1,
        why: "The map gives you the node directly. Unlinking needs the previous pointer; without it you would have to traverse, making get O(n).",
      },
    ],
    probs: ["Reverse Linked List", "Merge Two Sorted Lists", "Linked List Cycle", "Reorder List", "Remove Nth Node From End of List", "Copy List With Random Pointer", "Add Two Numbers", "Find The Duplicate Number", "LRU Cache", "Merge K Sorted Lists", "Reverse Nodes In K Group"],
  },

  {
    id: "m7", week: 7, phase: 2,
    title: "Heaps and top-K",
    tag: "Heap / Priority Queue",
    lesson: {
      big: "A heap answers one question well: what is the current extreme, in a collection that keeps changing? Push and pop are O(log n), peek is O(1). The counter-intuitive move that unlocks half of these problems: to keep the k LARGEST elements, you maintain a MIN-heap of size k, because the weakest survivor sits on top and is the one you evict.",
      triggers: [
        "\"k largest / k closest / k most frequent\"",
        "A stream: elements arrive over time and you must answer as you go",
        "\"median\" of a stream → two heaps facing each other",
        "Scheduling by priority: always take the most urgent thing next",
      ],
      code: {
        title: "Top-K with a size-k min-heap",
        body: `PriorityQueue<Integer> heap = new PriorityQueue<>();   // Java default = MIN heap
for (int x : nums) {
    heap.offer(x);
    if (heap.size() > k) heap.poll();     // drop the smallest survivor
}
return heap.peek();                       // kth largest

// Custom order: PriorityQueue<int[]> pq =
//     new PriorityQueue<>((a, b) -> b[1] - a[1]);   // max-heap by [1]`,
      },
      cost: "O(n log k) for top-K, which beats O(n log n) sorting when k is small. Building a heap from an existing array is O(n); n separate offers is O(n log n).",
      traps: [
        "Java's PriorityQueue is a MIN heap. For a max-heap pass `Comparator.reverseOrder()` or a lambda — forgetting this is the most common interview slip in Java.",
        "Comparator lambdas that subtract ints can overflow with large values. Use Integer.compare(a, b).",
        "Find Median From Data Stream: a max-heap for the lower half, a min-heap for the upper half, sizes kept within one of each other. Rebalance after every insert.",
        "Task Scheduler is a greedy counting problem — the heap version works, but the formula based on the most frequent task is what interviewers hope you notice.",
        "Top K Frequent Elements has an O(n) bucket-sort answer. Mention the heap solution, then offer the bucket one.",
      ],
    },
    quiz: [
      {
        q: "To keep the k largest elements of a stream, which heap do you maintain?",
        opts: ["A max-heap of size k", "A min-heap of size k", "A max-heap of size n", "Two heaps of size k/2"],
        a: 1,
        why: "The root of a size-k min-heap is the smallest of your current top k — exactly the element to evict when a bigger one arrives.",
      },
      {
        q: "Find Median From Data Stream keeps two heaps. Which is which?",
        opts: [
          "Min-heap for the lower half, max-heap for the upper half",
          "Max-heap for the lower half, min-heap for the upper half",
          "Two min-heaps, one reversed on read",
          "One heap and one sorted list",
        ],
        a: 1,
        why: "You need the largest of the small numbers and the smallest of the large numbers — those two roots straddle the median.",
      },
      {
        q: "In Java, `new PriorityQueue<int[]>((a,b) -> b[1] - a[1])` gives you…",
        opts: [
          "A min-heap by element [1]",
          "A max-heap by element [1], with overflow risk on large values",
          "A stable sort",
          "A compile error",
        ],
        a: 1,
        why: "Reversing the operands flips the order to max-first, but integer subtraction overflows if the values span more than Integer.MAX_VALUE. Integer.compare is the safe form.",
      },
    ],
    probs: ["Kth Largest Element In a Stream", "Last Stone Weight", "K Closest Points to Origin", "Kth Largest Element In An Array", "Task Scheduler", "Design Twitter", "Find Median From Data Stream"],
  },

  {
    id: "m8", week: 8, phase: 2,
    title: "Checkpoint: first mock loop",
    tag: "Review",
    checkpoint: true,
    lesson: {
      big: "This checkpoint is not about new material — it is about finding out whether the first seven modules survive contact with a timer and a blank editor. Solving a problem you have seen the solution to proves almost nothing. Solving a fresh medium in 25 minutes, out loud, proves a lot.",
      triggers: [],
      drill: [
        "Pick 4 problems you have already marked solved, from four different modules. Re-solve them from scratch with a 25-minute timer, no notes, no IDE autocomplete. Anything you cannot finish goes back to unsolved.",
        "Do two fresh mediums you have never seen (pramp.com or interviewing.io both give you a live human for free).",
        "Talk the entire time. Clarify inputs, state the brute force and its cost, propose the optimisation, then code. Silence is the most common reason strong candidates fail.",
        "Write down every bug you hit. Given enough reps the same three bugs keep repeating — those are the real weak spots, not whole topics.",
        "Rate yourself per module below and let the weakest two guide where the next block of review time goes.",
      ],
      cost: "Budget: 4 timed re-solves + 2 live mocks + 1 hour of written retrospective.",
      traps: [
        "Reading an editorial before your timer runs out. Sit in the discomfort — that is where the learning is.",
        "Grading yourself on whether the code ran. Grade on whether you reached the optimal approach unaided and could state its complexity.",
        "Skipping this week because it feels unproductive. Checkpoint weeks are where retention actually gets built.",
      ],
    },
    quiz: [],
    probs: [],
  },
];

MODULES.push(
  /* ============================ PHASE 3 ============================ */
  {
    id: "m9", week: 9, phase: 3,
    title: "Tree recursion: what to return",
    tag: "Trees",
    lesson: {
      big: "Your notes already have depth and diameter. Here is the idea underneath both: the hard part of tree recursion is never the recursion, it is deciding what each call RETURNS to its parent versus what it UPDATES globally. Diameter is the archetype — each call returns its height, but the answer being tracked (left height + right height) is not returnable, because a parent cannot build on a path that already turned a corner.",
      triggers: [
        "Anything about depth, height, balance, or paths",
        "\"Is this tree X\" — usually a post-order aggregation",
        "The natural brute force recomputes a subtree property at every node → you can usually fold it into one pass",
      ],
      code: {
        title: "Return one thing, update another (Diameter)",
        body: `int best = 0;

int height(TreeNode node) {
    if (node == null) return 0;
    int l = height(node.left);
    int r = height(node.right);

    best = Math.max(best, l + r);   // UPDATE: path through this node (edges)

    return 1 + Math.max(l, r);      // RETURN: what a parent can extend
}`,
      },
      cost: "O(n) — one visit per node. The naive version that calls height() inside a diameter() recursion is O(n²); saying so out loud is worth real credit.",
      traps: [
        "Depth in edges versus depth in nodes differs by one. Read which the problem wants; Maximum Depth of Binary Tree counts nodes.",
        "Balanced Binary Tree uses the same trick — return the height, set a global false flag when |l - r| > 1. Do not call height() separately at every node.",
        "Binary Tree Maximum Path Sum: clamp negative child sums to zero with Math.max(0, childSum), and remember the returned value can only include ONE child.",
        "Same Tree and Subtree of Another Tree: subtree is 'is same tree' called at every node — O(n × m), and that is the expected answer.",
        "Base case first, always. `if (node == null) return ...` on line one prevents most null pointer exceptions in this section.",
      ],
    },
    quiz: [
      {
        q: "In the one-pass diameter solution, why can't the function return l + r?",
        opts: [
          "It would overflow",
          "A path through this node has already turned; a parent can only extend a straight downward path",
          "Because l + r is the answer, not a height",
          "It can — either works",
        ],
        a: 1,
        why: "The parent needs a value it can add 1 to and keep extending upward. A path that used both children is complete and cannot be extended.",
      },
      {
        q: "Computing diameter by calling a separate height() at every node costs:",
        opts: ["O(n)", "O(n log n)", "O(n²) in the worst case", "O(2^n)"],
        a: 2,
        why: "Each height() call is O(size of subtree). On a degenerate, list-like tree that sums to O(n²). Folding the height into the same traversal makes it linear.",
      },
      {
        q: "Binary Tree Maximum Path Sum: what do you do with a child subtree whose best sum is negative?",
        opts: [
          "Return it as-is",
          "Treat it as 0 — a negative branch is never worth including",
          "Take its absolute value",
          "Prune the subtree entirely",
        ],
        a: 1,
        why: "Math.max(0, childSum) says 'or just don't go that way'. The node itself must still be counted, but a losing branch is optional.",
      },
    ],
    probs: ["Invert Binary Tree", "Maximum Depth of Binary Tree", "Diameter of Binary Tree", "Balanced Binary Tree", "Same Tree", "Subtree of Another Tree", "Binary Tree Maximum Path Sum"],
  },

  {
    id: "m10", week: 10, phase: 3,
    title: "Level order and BFS on trees",
    tag: "Trees",
    lesson: {
      big: "Your graph notes describe BFS with a queue. On trees it gains one refinement that comes up constantly: snapshot the queue size at the top of each level, then drain exactly that many nodes. That single line is what separates 'traverse everything' from 'process level by level', which is what most of these problems actually want.",
      triggers: [
        "\"level\", \"row\", \"each depth\", \"zigzag\"",
        "\"right side view\", \"leftmost node of the last row\"",
        "Shortest path in an unweighted structure",
        "Anything where the answer is grouped by distance from the root",
      ],
      code: {
        title: "Level-order with a size snapshot",
        body: `Queue<TreeNode> q = new LinkedList<>();
if (root != null) q.offer(root);

while (!q.isEmpty()) {
    int size = q.size();              // SNAPSHOT before draining
    List<Integer> level = new ArrayList<>();
    for (int i = 0; i < size; i++) {
        TreeNode node = q.poll();
        level.add(node.val);
        if (node.left  != null) q.offer(node.left);
        if (node.right != null) q.offer(node.right);
    }
    res.add(level);                   // one full level
}`,
      },
      cost: "O(n) time, O(w) space where w is the maximum width of the tree — which for a full tree is about n/2.",
      traps: [
        "Reading q.size() inside the for-loop condition. It changes as you add children, and your levels smear together.",
        "Right Side View is the LAST node of each level (or the first, if you enqueue right before left). A DFS that tracks depth and records the first node seen at each new depth also works and uses less memory on wide trees.",
        "Serialize And Deserialize Binary Tree: null markers are mandatory. Pre-order with '#' for null is the cleanest; splitting on commas and using an index pointer rebuilds it.",
        "Count Good Nodes is DFS carrying the max-so-far down the recursion — a good contrast with BFS, since the information flows downward, not upward.",
      ],
    },
    quiz: [
      {
        q: "Which line makes a BFS process one level at a time?",
        opts: [
          "Using a Deque instead of a Queue",
          "Capturing int size = q.size() before draining that many nodes",
          "Adding null between levels",
          "Sorting the queue by depth",
        ],
        a: 1,
        why: "The snapshot fixes how many nodes belong to the current level before their children start arriving. The null-sentinel trick also works but is fiddlier.",
      },
      {
        q: "Count Good Nodes passes the running maximum DOWN the recursion. That is because…",
        opts: [
          "The information a node needs comes from its ancestors, not its descendants",
          "BFS cannot visit a tree twice",
          "It saves memory",
          "The tree is a BST",
        ],
        a: 0,
        why: "Direction of information flow is the design question. Ancestors → pass a parameter down. Descendants → return a value up. Both → do one of each.",
      },
      {
        q: "Why does serializing a binary tree require explicit null markers?",
        opts: [
          "To keep the string a fixed length",
          "Because a traversal without them is ambiguous — several different trees produce the same sequence",
          "Java requires it",
          "They aren't required if you use level order",
        ],
        a: 1,
        why: "Pre-order alone cannot distinguish a left-only chain from a right-only chain. Nulls restore the structure, which is why one traversal plus markers is enough.",
      },
    ],
    probs: ["Binary Tree Level Order Traversal", "Binary Tree Right Side View", "Count Good Nodes In Binary Tree", "Serialize And Deserialize Binary Tree"],
  },

  {
    id: "m11", week: 11, phase: 3,
    title: "BSTs and reconstruction",
    tag: "Trees",
    lesson: {
      big: "One fact generates most BST problems: an in-order traversal of a BST produces sorted output. That gives you Kth Smallest for free, and it gives you validation — but validation needs a RANGE handed down from ancestors, not a comparison with the immediate parent. The classic wrong answer checks left.val < node.val < right.val and passes every test except the one where a deep node violates a distant ancestor.",
      triggers: [
        "\"BST\" in the prompt — always ask whether in-order sortedness solves it",
        "\"kth smallest / largest\" in a BST",
        "\"validate\", \"is this a valid BST\"",
        "Rebuilding a tree from traversal orders",
      ],
      code: {
        title: "Validation by range, and reconstruction",
        body: `boolean valid(TreeNode node, Long lo, Long hi) {
    if (node == null) return true;
    if (node.val <= lo || node.val >= hi) return false;
    return valid(node.left,  lo, (long) node.val)
        && valid(node.right, (long) node.val, hi);
}
// call: valid(root, Long.MIN_VALUE, Long.MAX_VALUE)

// Reconstruction: preorder[0] is the root.
// Find it in inorder at index k -> k nodes on the left, rest on the right.
// Recurse on the matching slices. Use a HashMap<val,index> for O(1) lookup.`,
      },
      cost: "Validation and in-order are O(n). Reconstruction is O(n) with a value→index map, O(n²) if you scan the in-order array each time.",
      traps: [
        "Bounding with Integer.MIN_VALUE / MAX_VALUE breaks when a node actually holds those values. Use Long, or nullable bounds.",
        "LCA in a BST is not the general LCA algorithm — just walk down while both targets are on the same side, and the first node that splits them is the answer. O(h), no recursion needed.",
        "Kth Smallest: an iterative in-order with an explicit stack lets you stop early at k, instead of traversing the whole tree.",
        "Reconstruction from preorder + inorder works because preorder identifies roots and inorder splits sides. Postorder + inorder also works; preorder + postorder does NOT uniquely determine a binary tree.",
      ],
    },
    quiz: [
      {
        q: "Why is checking left.val < node.val < right.val at every node insufficient for BST validation?",
        opts: [
          "It's O(n²)",
          "It misses violations against non-immediate ancestors — a node deep in the left subtree can exceed the root",
          "It fails on empty trees",
          "It's actually sufficient",
        ],
        a: 1,
        why: "Every node in the left subtree must be below the ROOT, not merely below its own parent. Passing a shrinking (lo, hi) range down enforces that.",
      },
      {
        q: "The most efficient LCA of two nodes in a BST is:",
        opts: [
          "Post-order recursion returning found flags, O(n)",
          "Walk from the root; the first node that sits between the two values is the answer, O(h)",
          "Store parent pointers and walk up",
          "Serialize the tree and compare paths",
        ],
        a: 1,
        why: "Sortedness tells you which direction both targets lie. When they diverge, you are standing on the split point. Height, not node count.",
      },
      {
        q: "Which traversal pair does NOT uniquely reconstruct a binary tree?",
        opts: ["Preorder + inorder", "Postorder + inorder", "Preorder + postorder", "Level order + inorder"],
        a: 2,
        why: "Without inorder there is no way to split left from right, so a node with one child is ambiguous. This is a favourite follow-up question.",
      },
    ],
    probs: ["Lowest Common Ancestor of a Binary Search Tree", "Validate Binary Search Tree", "Kth Smallest Element In a Bst", "Construct Binary Tree From Preorder And Inorder Traversal"],
  },

  {
    id: "m12", week: 12, phase: 3,
    title: "Tries",
    tag: "Tries",
    lesson: {
      big: "A trie stores a set of strings by sharing their prefixes, so a lookup costs O(length of the word) regardless of how many words are in the dictionary. Only three problems in the 150 use it, but they show up disproportionately in real onsites — autocomplete, spell-check and search-suggestion questions are all this structure wearing a product hat.",
      triggers: [
        "\"prefix\", \"starts with\", \"autocomplete\", \"dictionary\"",
        "You are about to check many words against a board or a stream, and repeated prefix work is being wasted",
        "Wildcard matching within a fixed word set",
      ],
      code: {
        title: "The node, and insert",
        body: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;                // MUST have this
}

void insert(String word) {
    TrieNode cur = root;
    for (char c : word.toCharArray()) {
        int i = c - 'a';
        if (cur.children[i] == null) cur.children[i] = new TrieNode();
        cur = cur.children[i];
    }
    cur.isEnd = true;
}`,
      },
      cost: "Insert and search are O(L). Space is O(total characters × alphabet) with arrays, less with a HashMap per node when the alphabet is sparse.",
      traps: [
        "Forgetting isEnd. Without it you cannot tell a complete word from a prefix, and \"app\" matches when only \"apple\" was inserted.",
        "Design Add And Search Words: a '.' branches into every non-null child, so the search becomes a DFS. Only the wildcard positions branch — the rest stay a simple walk.",
        "Word Search II is the payoff problem: build a trie of the dictionary, then DFS the board ONCE while walking the trie in parallel. Prune the moment the current path has no matching child.",
        "In Word Search II, remove words from the trie after finding them (or clear isEnd) so you do not report duplicates and so dead branches get pruned.",
      ],
    },
    quiz: [
      {
        q: "Why is a trie faster than a HashSet for prefix queries?",
        opts: [
          "Hashing is slower than pointer chasing",
          "A HashSet can only answer exact membership; prefix queries would need to test every prefix or scan the whole set",
          "Tries use less memory",
          "They are the same speed",
        ],
        a: 1,
        why: "The trie's structure IS the prefix index. A set gives you exact lookup only, so 'how many words start with app' degrades to a scan.",
      },
      {
        q: "In Word Search II, what does the trie buy you over running Word Search once per word?",
        opts: [
          "Nothing, it's the same complexity",
          "All words share one board traversal, and dead prefixes prune the DFS immediately",
          "It removes the need for a visited set",
          "It sorts the output",
        ],
        a: 1,
        why: "Per-word search repeats the same board walks. With a trie, the moment a path's prefix has no trie child you stop — one traversal serves the whole dictionary.",
      },
      {
        q: "What happens if you omit the isEnd flag?",
        opts: [
          "Insert breaks",
          "You cannot distinguish a stored word from a prefix of one, so search returns false positives",
          "Memory usage doubles",
          "Only the wildcard search breaks",
        ],
        a: 1,
        why: "Reaching a node only proves the path exists. isEnd is what says 'a word terminates here'.",
      },
    ],
    probs: ["Implement Trie Prefix Tree", "Design Add And Search Words Data Structure", "Word Search II"],
  },

  /* ============================ PHASE 4 ============================ */
  {
    id: "m13", week: 13, phase: 4,
    title: "Grids are graphs",
    tag: "Graphs",
    lesson: {
      big: "Your notes describe DFS and BFS on nodes with neighbour lists. A grid is the same thing with the adjacency list left implicit: the neighbours of (r, c) are the four cells around it, and 'visited' is usually a boolean grid or an in-place mutation. Once you see that, half the graph section is the same twenty lines with a different condition.",
      triggers: [
        "A 2D char or int matrix, and the words \"island\", \"region\", \"region enclosed by\"",
        "\"shortest time for X to spread\" → multi-source BFS",
        "\"distance to the nearest gate/zero\" → multi-source BFS from all the sources at once",
        "\"cells that can reach both edges\" → reverse the direction and start from the edges",
      ],
      code: {
        title: "Multi-source BFS — seed the queue with every source",
        body: `int[][] DIRS = {{1,0},{-1,0},{0,1},{0,-1}};
Queue<int[]> q = new LinkedList<>();

for (int r = 0; r < rows; r++)
    for (int c = 0; c < cols; c++)
        if (grid[r][c] == SOURCE) q.offer(new int[]{r, c});   // ALL sources

int minutes = 0;
while (!q.isEmpty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) {
        int[] cell = q.poll();
        for (int[] d : DIRS) {
            int nr = cell[0] + d[0], nc = cell[1] + d[1];
            if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
            if (grid[nr][nc] != FRESH) continue;
            grid[nr][nc] = SOURCE;         // mark when ENQUEUED, not when polled
            q.offer(new int[]{nr, nc});
        }
    }
    minutes++;
}`,
      },
      cost: "O(rows × cols) — every cell is enqueued at most once. That is true even with many sources, which is why multi-source BFS beats running BFS from each source separately.",
      traps: [
        "Marking visited when you POLL instead of when you ENQUEUE. The same cell gets queued by several neighbours and your counts inflate.",
        "Pacific Atlantic Water Flow: do not simulate water flowing downhill from each cell. Start at each ocean's border and walk UPHILL, then intersect the two reachable sets.",
        "Surrounded Regions: mark the regions connected to the border as safe first, then flip everything else. Trying to detect 'enclosed' directly is much harder.",
        "Recursive DFS on a 1000×1000 grid can blow the Java stack. Have an iterative version in your pocket, and say so when the constraints are large.",
        "Clone Graph needs a map from original node to copy, checked before recursing, or you loop forever on cycles.",
      ],
    },
    quiz: [
      {
        q: "In Rotting Oranges, why seed the BFS queue with every rotten orange before the first round?",
        opts: [
          "To count them",
          "Because rot spreads from all of them simultaneously — separate BFS runs would give wrong times",
          "To sort the queue",
          "It doesn't matter, order is irrelevant",
        ],
        a: 1,
        why: "Multi-source BFS makes minute 1 mean 'one minute from the NEAREST source'. Running BFS per source and taking a minimum is both slower and easy to get wrong.",
      },
      {
        q: "Pacific Atlantic Water Flow is solved by…",
        opts: [
          "DFS from every cell to see if it reaches both oceans",
          "DFS inward from both ocean borders, moving to cells of equal or greater height, then intersecting",
          "Sorting cells by height and sweeping",
          "Union-Find on all cells",
        ],
        a: 1,
        why: "Reversing the direction of the relation turns O(cells × cells) into O(cells). Recognising a reversible relation is the transferable idea here.",
      },
      {
        q: "You mark grid cells visited when they are polled from the queue rather than when enqueued. What goes wrong?",
        opts: [
          "Nothing",
          "A cell can be enqueued multiple times by different neighbours, inflating counts and time",
          "The BFS becomes a DFS",
          "You get a stack overflow",
        ],
        a: 1,
        why: "Between being enqueued and being polled, a cell is unmarked and visible to other neighbours. Mark at enqueue time.",
      },
    ],
    probs: ["Number of Islands", "Max Area of Island", "Clone Graph", "Walls And Gates", "Rotting Oranges", "Pacific Atlantic Water Flow", "Surrounded Regions"],
  },

  {
    id: "m14", week: 14, phase: 4,
    title: "Backtracking",
    tag: "Backtracking",
    lesson: {
      big: "Build a partial answer, recurse, then undo the last choice. The template you reach for depends on the shape of the decision tree: 'include or exclude this element' for subsets, or 'loop over the remaining choices from index start' for combinations and permutations. Draw the tree for n = 3 on paper before coding — every bug in this section is a wrong branch shape, not a wrong line.",
      triggers: [
        "\"all combinations / permutations / subsets\"",
        "\"return every valid arrangement\" rather than a count or a maximum",
        "Constraint puzzles: N-Queens, Sudoku, word search on a board",
        "The output size is itself exponential — a hint that exponential time is expected",
      ],
      code: {
        title: "Choice-loop template, with the two duplicate rules",
        body: `void backtrack(int start, List<Integer> path) {
    res.add(new ArrayList<>(path));       // COPY, never the live list
    for (int i = start; i < nums.length; i++) {
        if (i > start && nums[i] == nums[i - 1]) continue;  // skip dups (sorted!)
        path.add(nums[i]);
        backtrack(i + 1, path);           // i + 1 = each element once
                                          // i     = reuse allowed (Combination Sum)
        path.remove(path.size() - 1);     // UNDO
    }
}`,
      },
      cost: "O(n × 2ⁿ) for subsets, O(n × n!) for permutations — the n factor is the copy at each leaf. Say the output size out loud; it justifies the exponent.",
      traps: [
        "Adding `path` instead of `new ArrayList<>(path)`. Every entry in your result then points at the same list, which ends up empty.",
        "Forgetting the undo. The list keeps growing and results turn to nonsense.",
        "`i + 1` versus `i` in the recursive call is the entire difference between Combination Sum (reuse allowed) and Combination Sum II (each element once).",
        "Duplicate skipping requires a SORTED array and the condition `i > start`, not `i > 0`. With `i > 0` you also skip legitimate repeats at deeper levels.",
        "Permutations do not use a start index — they use a used[] boolean array or swapping, because order matters and every unused element is a candidate.",
        "N-Queens: track attacked columns and both diagonals with sets (col, r + c, r - c) instead of rescanning the board.",
      ],
    },
    quiz: [
      {
        q: "Combination Sum allows reusing an element; Combination Sum II does not. What single change expresses this?",
        opts: [
          "Sorting versus not sorting",
          "Passing i versus i + 1 into the recursive call",
          "Using a set versus a list for results",
          "The base case condition",
        ],
        a: 1,
        why: "Passing i lets the same index be chosen again at the next level; i + 1 moves past it permanently. One character, entirely different problem.",
      },
      {
        q: "Why must the duplicate-skip condition be `i > start` rather than `i > 0`?",
        opts: [
          "For performance only",
          "`i > 0` would also skip a repeated value that is legitimately being chosen at a deeper level",
          "`i > start` avoids an index-out-of-bounds",
          "They are equivalent",
        ],
        a: 1,
        why: "The rule is 'do not pick the same value twice in the SAME position of the tree'. `i > start` scopes it to the current level; `i > 0` over-prunes.",
      },
      {
        q: "What is wrong with `res.add(path)` at the base case?",
        opts: [
          "Nothing",
          "It stores a reference to a list you keep mutating, so all results end up identical or empty",
          "It is slower than copying",
          "It breaks the recursion depth",
        ],
        a: 1,
        why: "Java stores the reference. Your undo steps then empty every 'saved' result. `new ArrayList<>(path)` snapshots the current state.",
      },
    ],
    probs: ["Subsets", "Combination Sum", "Combination Sum II", "Permutations", "Subsets II", "Generate Parentheses", "Word Search", "Palindrome Partitioning", "Letter Combinations of a Phone Number", "N Queens"],
  },

  {
    id: "m15", week: 15, phase: 4,
    title: "Topological sort",
    tag: "Graphs",
    lesson: {
      big: "Given tasks with prerequisites, produce a valid order — or prove none exists, which happens exactly when the graph has a cycle. Two implementations do the job. Kahn's algorithm repeatedly takes any node with no remaining prerequisites; DFS colouring emits nodes in reverse post-order. Learn Kahn's first: cycle detection falls out of it for free.",
      triggers: [
        "\"prerequisites\", \"dependencies\", \"build order\", \"course schedule\"",
        "\"is it possible to finish\" → cycle detection",
        "Deriving an ordering of symbols from comparisons (Alien Dictionary)",
      ],
      code: {
        title: "Kahn's algorithm — indegree plus a queue",
        body: `List<List<Integer>> adj = new ArrayList<>();
for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
int[] indeg = new int[n];
for (int[] p : prerequisites) {   // p = {course, prereq}: edge prereq -> course
    adj.get(p[1]).add(p[0]);
    indeg[p[0]]++;
}

Queue<Integer> q = new LinkedList<>();
for (int i = 0; i < n; i++) if (indeg[i] == 0) q.offer(i);

List<Integer> order = new ArrayList<>();
while (!q.isEmpty()) {
    int u = q.poll();
    order.add(u);
    for (int v : adj.get(u))
        if (--indeg[v] == 0) q.offer(v);
}
return order.size() == n ? order : new ArrayList<Integer>();  // short => cycle`,
      },
      cost: "O(V + E) for both implementations.",
      traps: [
        "Edge direction. For Course Schedule, [a, b] means b must come before a, so the edge runs b → a. Reversing it produces a plausible-looking but wrong order.",
        "The cycle check is `order.size() == n`. If some node never reached indegree zero, it is stuck in a cycle.",
        "The DFS version needs three states — unvisited, in the current recursion stack, and finished. A two-state visited flag reports false cycles on diamond-shaped graphs.",
        "Alien Dictionary has a subtle invalid case: if word A is a prefix of word B but appears AFTER it, no ordering exists, regardless of letters.",
        "Word Ladder is BFS on an implicit graph, not topological sort — build neighbours by wildcarding one character at a time and bucketing.",
      ],
    },
    quiz: [
      {
        q: "In Kahn's algorithm, how do you detect that a valid ordering is impossible?",
        opts: [
          "The queue becomes empty at some point",
          "The output list is shorter than the number of nodes",
          "Some indegree goes negative",
          "A node is visited twice",
        ],
        a: 1,
        why: "Nodes trapped in a cycle never reach indegree zero, so they never enter the queue. A short output is exactly the cycle signature.",
      },
      {
        q: "A DFS-based cycle detector on a DIRECTED graph needs three states because:",
        opts: [
          "Performance",
          "A node already fully explored via another path is fine, but a node currently on the recursion stack means a back edge — a cycle",
          "Directed graphs can have self-loops",
          "It needs to track edge weights",
        ],
        a: 1,
        why: "Grey (on the stack) versus black (finished) is the whole distinction. With one visited flag, a diamond A→B→D, A→C→D falsely reports a cycle.",
      },
      {
        q: "Alien Dictionary: [\"abc\", \"ab\"] should return…",
        opts: [
          "The order a, b, c",
          "An empty string — a prefix cannot legitimately come after the longer word",
          "Any valid order of a, b, c",
          "The order c, b, a",
        ],
        a: 1,
        why: "This is the edge case interviewers actually check. No letter comparison can rescue it; the dictionary itself is inconsistent.",
      },
    ],
    probs: ["Course Schedule", "Course Schedule II", "Alien Dictionary", "Word Ladder"],
  },

  {
    id: "m16", week: 16, phase: 4,
    title: "Union-Find and weighted graphs",
    tag: "Advanced Graphs",
    lesson: {
      big: "Two more tools finish the graph section. Union-Find answers 'are these two nodes connected yet?' as edges arrive, in near-constant time with path compression and union by size. Dijkstra is BFS with a priority queue instead of a plain queue, which is what you need the moment edges have different weights — because with weights, the fewest hops is no longer the cheapest path.",
      triggers: [
        "\"connected components\", \"redundant connection\", \"is this a valid tree\"",
        "Edges arriving one at a time, and you must detect the first one that closes a cycle",
        "\"minimum cost to connect all\" → minimum spanning tree (Prim's or Kruskal's)",
        "\"cheapest / fastest path\" with weights → Dijkstra; with a hop limit or negative edges → Bellman-Ford",
      ],
      code: {
        title: "Union-Find, and the Dijkstra loop",
        body: `int[] parent, size;
int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);   // path compression
    return parent[x];
}
boolean union(int a, int b) {
    int ra = find(a), rb = find(b);
    if (ra == rb) return false;                        // already connected = cycle
    if (size[ra] < size[rb]) { int t = ra; ra = rb; rb = t; }
    parent[rb] = ra; size[ra] += size[rb];
    return true;
}

// Dijkstra: adj.get(u) holds {neighbour, weight} pairs
void dijkstra(int src, Map<Integer, List<int[]>> adj) {
    Set<Integer> seen = new HashSet<>();
    PriorityQueue<int[]> pq =
        new PriorityQueue<>((a, b) -> a[0] - b[0]);    // {dist, node}
    pq.offer(new int[]{0, src});
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        if (!seen.add(cur[1])) continue;               // skip stale entries
        for (int[] e : adj.get(cur[1]))
            if (!seen.contains(e[0]))
                pq.offer(new int[]{cur[0] + e[1], e[0]});
    }
}`,
      },
      cost: "Union-Find is O(α(n)) per operation — effectively constant. Dijkstra is O(E log V). Bellman-Ford is O(V × E) but tolerates negative weights and hop limits.",
      traps: [
        "Union-Find without path compression degrades to O(n) per find on adversarial input. Both optimisations are two lines each; always include them.",
        "Graph Valid Tree needs TWO conditions: exactly n − 1 edges and no cycle (equivalently, fully connected). Checking only one is the standard wrong answer.",
        "Dijkstra must skip stale queue entries. Without the `seen` guard you process the same node at an outdated distance.",
        "Dijkstra is wrong with negative edge weights, and wrong for Cheapest Flights Within K Stops, because a cheaper path with too many hops is invalid. Use Bellman-Ford with k + 1 relaxation rounds.",
        "Min Cost to Connect All Points is a complete graph — do not build all n² edges if n is large; Prim's with a heap grows the tree lazily.",
      ],
    },
    quiz: [
      {
        q: "Graph Valid Tree requires which two conditions?",
        opts: [
          "No cycles, and at least n − 1 edges",
          "Exactly n − 1 edges, and all nodes connected",
          "Connected, and every node has degree ≥ 1",
          "No cycles only",
        ],
        a: 1,
        why: "A forest has no cycles but is not a tree. n − 1 edges plus connectivity gives both properties; with Union-Find, a failed union signals a cycle.",
      },
      {
        q: "Why does Cheapest Flights Within K Stops break plain Dijkstra?",
        opts: [
          "The graph is too large",
          "A path can be cheaper but use too many stops, so the greedy 'settled' invariant no longer holds",
          "Edge weights are negative",
          "It doesn't break — Dijkstra works fine",
        ],
        a: 1,
        why: "Dijkstra assumes once a node is settled its distance is final. With a stop limit, a pricier path with fewer stops may still be the only usable one. Bellman-Ford relaxed k + 1 times respects the constraint.",
      },
      {
        q: "What does `union(a, b)` returning false tell you?",
        opts: [
          "The union failed due to an error",
          "a and b were already in the same component — this edge closes a cycle",
          "One of them is not in the structure",
          "The components were equal in size",
        ],
        a: 1,
        why: "That is the whole trick behind Redundant Connection: process edges in order and the first one that returns false is the answer.",
      },
    ],
    probs: ["Graph Valid Tree", "Number of Connected Components In An Undirected Graph", "Redundant Connection", "Network Delay Time", "Min Cost to Connect All Points", "Cheapest Flights Within K Stops", "Swim In Rising Water", "Reconstruct Itinerary"],
  }
);

MODULES.push(
  /* ============================ PHASE 5 ============================ */
  {
    id: "m17", week: 17, phase: 5,
    title: "1-D DP: defining the state",
    tag: "1-D Dynamic Programming",
    lesson: {
      big: "Dynamic programming is recursion whose answers you write down. The coding is trivial; the whole difficulty is the state definition. Say it as an English sentence before touching the keyboard: \"dp[i] is the best result for the first i elements\" or \"…for a result that ENDS exactly at i\". Those two are different, and picking the wrong one is why a DP feels impossible.",
      triggers: [
        "\"maximum / minimum / number of ways\" — a single value, not a list of arrangements",
        "You can make a choice at each step, and the future only depends on a small summary of the past",
        "Your backtracking solution recomputes the same subproblem",
        "Constraints around n ≤ 10⁴ with an obviously exponential brute force",
      ],
      code: {
        title: "State, recurrence, base case, order — House Robber",
        body: `// STATE:      dp[i] = most money robbable from houses 0..i
// RECURRENCE: dp[i] = max(dp[i-1],            // skip house i
//                         dp[i-2] + nums[i])  // rob house i
// BASE:       dp[0] = nums[0]
// ORDER:      left to right

int prev2 = 0, prev1 = 0;              // rolling: only 2 states matter
for (int x : nums) {
    int cur = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = cur;
}
return prev1;                          // O(n) time, O(1) space`,
      },
      cost: "O(n) time. Space starts at O(n) and usually collapses to O(1) once you notice how far back the recurrence reaches.",
      traps: [
        "Maximum Product Subarray needs TWO states — the best and the WORST product ending at i — because a negative number turns the worst into the best. This is the canonical 'my state was too small' lesson.",
        "House Robber II is circular: run the linear solver twice, once excluding the first house and once excluding the last, and take the max. Do not invent a new recurrence.",
        "Decode Ways: watch '0'. It can never stand alone, and \"06\" is not a valid two-digit decode.",
        "\"Best up to i\" versus \"best ending at i\". Kadane's and Maximum Product both need the latter, then take a max over all i at the end.",
        "Always write the recurrence as a comment before coding it. Interviewers grade the derivation, not the loop.",
      ],
    },
    quiz: [
      {
        q: "Why does Maximum Product Subarray track the minimum product as well as the maximum?",
        opts: [
          "To handle zeros",
          "A negative value multiplied by the smallest (most negative) product can become the largest",
          "For the O(1) space optimisation",
          "To detect overflow",
        ],
        a: 1,
        why: "Multiplication is not monotone across sign changes. The most negative running product is a live candidate for best-after-the-next-negative.",
      },
      {
        q: "House Robber II (houses in a circle) is solved by…",
        opts: [
          "A new circular recurrence",
          "Running the linear solution twice: once on houses 0..n-2 and once on 1..n-1, then taking the max",
          "Doubling the array",
          "Sorting the houses first",
        ],
        a: 1,
        why: "The first and last house are mutually exclusive. Excluding one at a time turns a circle back into two lines you already know how to solve.",
      },
      {
        q: "\"dp[i] = best subarray sum ending exactly at i\" rather than \"best among the first i\" — why does that matter for Kadane's?",
        opts: [
          "It doesn't, they're equivalent",
          "The recurrence needs to know whether i extends the previous subarray, which requires contiguity at i",
          "It saves memory",
          "It handles empty arrays",
        ],
        a: 1,
        why: "dp[i-1] as 'best anywhere so far' may describe a subarray that ended long ago, which you cannot extend. Ending-at-i keeps the recurrence local and valid.",
      },
    ],
    probs: ["Climbing Stairs", "Min Cost Climbing Stairs", "House Robber", "House Robber II", "Decode Ways", "Maximum Product Subarray"],
  },

  {
    id: "m18", week: 18, phase: 5,
    title: "Knapsack and sequence DP",
    tag: "1-D Dynamic Programming",
    lesson: {
      big: "Most remaining 1-D DP problems are one of two families in disguise. Knapsack: you have a budget and items, and each item is either usable once (0/1) or unlimited (unbounded) — and the only code difference is the direction of the inner loop. Sequence DP: you scan left to right and each position looks back at all earlier positions, which is the O(n²) shape behind Longest Increasing Subsequence and Word Break.",
      triggers: [
        "\"can we reach exactly this total\", \"fewest coins\", \"can this be split evenly\" → knapsack",
        "\"longest subsequence with a property\" (non-contiguous!) → sequence DP",
        "\"in how many ways\" with a target sum → counting knapsack",
      ],
      code: {
        title: "The loop direction is the whole difference",
        body: `// UNBOUNDED (Coin Change) — an item may be reused
for (int coin : coins)
    for (int amt = coin; amt <= target; amt++)          // FORWARD
        dp[amt] = Math.min(dp[amt], dp[amt - coin] + 1);

// 0/1 (Partition Equal Subset Sum) — each item used at most once
for (int num : nums)
    for (int amt = target; amt >= num; amt--)           // BACKWARD
        dp[amt] |= dp[amt - num];

// SEQUENCE (Longest Increasing Subsequence), O(n^2)
for (int i = 0; i < n; i++)
    for (int j = 0; j < i; j++)
        if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);`,
      },
      cost: "Knapsack is O(items × target). LIS is O(n²) with this loop, or O(n log n) with the patience-sorting variant that binary searches a tails array.",
      traps: [
        "Iterating the inner knapsack loop forward when items are single-use lets the same item be picked twice. Backward is the fix, and it is the detail interviewers probe.",
        "Coin Change: initialise dp to a sentinel like amount + 1 (not Integer.MAX_VALUE, which overflows on +1) and check it at the end for 'impossible'.",
        "Partition Equal Subset Sum: bail out immediately if the total is odd. Then it is a 0/1 knapsack for total / 2.",
        "Longest Palindromic Substring is usually better with expand-around-centre — O(n²) time, O(1) space, and simpler to write than the DP table.",
        "Word Break: dp[i] means 'the prefix of length i is breakable'. Loop j over earlier split points and check both dp[j] and the dictionary for s[j..i].",
      ],
    },
    quiz: [
      {
        q: "In a 1-D knapsack array, iterating the capacity loop BACKWARD makes each item…",
        opts: [
          "Reusable an unlimited number of times",
          "Usable at most once",
          "Faster to process",
          "Sorted by weight",
        ],
        a: 1,
        why: "Going backward means dp[amt - num] still refers to the state before this item was considered. Forward lets the item's own update feed back into itself.",
      },
      {
        q: "Why initialise the Coin Change dp array to amount + 1 rather than Integer.MAX_VALUE?",
        opts: [
          "It's faster",
          "MAX_VALUE + 1 overflows to a negative number and silently corrupts the minimum",
          "amount + 1 is the correct answer for impossible cases",
          "To save memory",
        ],
        a: 1,
        why: "A sentinel larger than any real answer but small enough to survive +1. Overflow bugs like this are exactly what a careful interviewer looks for.",
      },
      {
        q: "The O(n log n) Longest Increasing Subsequence maintains an array where…",
        opts: [
          "Every element is part of the final subsequence",
          "tails[k] is the smallest possible tail of an increasing subsequence of length k + 1",
          "Elements are sorted copies of the input",
          "Each entry counts occurrences",
        ],
        a: 1,
        why: "The array's LENGTH is the answer; its contents are not necessarily a real subsequence. Binary search finds where each new value replaces a tail.",
      },
    ],
    probs: ["Coin Change", "Word Break", "Longest Increasing Subsequence", "Partition Equal Subset Sum", "Longest Palindromic Substring", "Palindromic Substrings"],
  },

  {
    id: "m19", week: 19, phase: 5,
    title: "2-D DP",
    tag: "2-D Dynamic Programming",
    lesson: {
      big: "Two changing quantities means a two-dimensional table — almost always two strings, or a position in a grid. The recurrence answers one question at cell (i, j): do these two ends match? If yes, consume both and take the diagonal. If not, try dropping one side or the other. Longest Common Subsequence is the template that most of this section is a variation on.",
      triggers: [
        "TWO sequences compared against each other",
        "A grid where you may only move right and down",
        "\"edit distance\", \"how many ways to transform\", \"interleaving\"",
        "State that needs both a position AND a mode (holding / cooling down / used)",
      ],
      code: {
        title: "Longest Common Subsequence — the shape to memorise",
        body: `int[][] dp = new int[a.length() + 1][b.length() + 1];   // +1 for empty prefixes

for (int i = 1; i <= a.length(); i++) {
    for (int j = 1; j <= b.length(); j++) {
        if (a.charAt(i - 1) == b.charAt(j - 1))
            dp[i][j] = dp[i - 1][j - 1] + 1;               // match: take diagonal
        else
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // drop one side
    }
}
return dp[a.length()][b.length()];`,
      },
      cost: "O(n × m) time and space. Space usually reduces to two rows, or one row updated carefully in place.",
      traps: [
        "Off-by-one between the table index and the string index. The +1 padding row and column represent empty prefixes; charAt uses i − 1.",
        "Edit Distance has THREE transitions on a mismatch — insert, delete, replace — all costing 1 plus a neighbour. Missing one gives answers that are close but wrong.",
        "Best Time to Buy And Sell Stock With Cooldown is not a grid — it is a state machine with three modes. Model it as dp[i][state], which is the same idea with a tiny second dimension.",
        "Longest Increasing Path In a Matrix is memoised DFS, not a filled table, because there is no valid fill order until you follow the edges. No visited set is needed — strictly increasing paths cannot cycle.",
        "Unique Paths with no obstacles has a closed-form binomial answer. Mention it; then write the DP.",
      ],
    },
    quiz: [
      {
        q: "In the LCS table, what does dp[i][j] represent?",
        opts: [
          "Whether a[i] equals b[j]",
          "The LCS length of the first i characters of a and the first j characters of b",
          "The edit distance between the suffixes",
          "The number of matching characters so far",
        ],
        a: 1,
        why: "Prefix lengths, not indices — which is why the table is (n+1) × (m+1) and the empty-prefix row is all zeros.",
      },
      {
        q: "Longest Increasing Path In a Matrix uses memoised DFS instead of an iterative table because…",
        opts: [
          "The matrix is too large",
          "There is no obvious order to fill the table in — dependencies follow the increasing edges",
          "It needs less memory",
          "Recursion is always preferred for matrices",
        ],
        a: 1,
        why: "Table DP needs a topological fill order. Here it is implicit in the height relation, so recursion with a memo grid discovers the order for you.",
      },
      {
        q: "On a character mismatch, Edit Distance takes 1 + min of which three cells?",
        opts: [
          "dp[i-1][j-1], dp[i-1][j], dp[i][j-1]",
          "dp[i-1][j-1], dp[i-2][j], dp[i][j-2]",
          "dp[i-1][j] and dp[i][j-1] only",
          "dp[i-1][j-1] only",
        ],
        a: 0,
        why: "Diagonal is replace, up is delete, left is insert. Each costs one operation plus whatever that neighbouring state already cost.",
      },
    ],
    probs: ["Unique Paths", "Longest Common Subsequence", "Best Time to Buy And Sell Stock With Cooldown", "Coin Change II", "Target Sum", "Interleaving String", "Longest Increasing Path In a Matrix", "Distinct Subsequences", "Edit Distance", "Burst Balloons", "Regular Expression Matching"],
  },

  {
    id: "m20", week: 20, phase: 5,
    title: "Greedy, and proving it",
    tag: "Greedy",
    lesson: {
      big: "Greedy takes the locally best option and never reconsiders. It is the shortest code in the 150 and the easiest to get wrong, because most greedy-looking problems are actually DP. The thing that separates a passing answer from a strong one is the exchange argument: 'if an optimal solution does not make my greedy choice, I can swap in my choice without making things worse.' If you cannot sketch that in one sentence, do not commit to greedy.",
      triggers: [
        "You only need one number, and choices never need to be revisited",
        "\"Can you reach the end\", \"minimum jumps\", \"is a valid split possible\"",
        "Sorting the input makes the correct choice obvious",
        "A DP solution exists but the constraints are far too large for it",
      ],
      code: {
        title: "Two greedy shapes worth memorising",
        body: `// Jump Game: track the farthest index reachable so far
boolean canJump(int[] nums) {
    int farthest = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > farthest) return false;             // a gap you cannot cross
        farthest = Math.max(farthest, i + nums[i]);
    }
    return true;
}

// Gas Station: a non-negative total guarantees a solution; the start is
// wherever the running tank last dipped below zero
int startStation(int[] gas, int[] cost) {
    int total = 0, tank = 0, start = 0;
    for (int i = 0; i < gas.length; i++) {
        int diff = gas[i] - cost[i];
        total += diff;
        tank  += diff;
        if (tank < 0) { start = i + 1; tank = 0; }
    }
    return total >= 0 ? start : -1;
}`,
      },
      cost: "Usually O(n), or O(n log n) when sorting is the enabling step.",
      traps: [
        "Assuming greedy works because it passes the examples. Coin Change with arbitrary denominations is the classic counterexample — greedy fails on coins {1, 3, 4} and target 6.",
        "Gas Station: proving that a non-negative total guarantees a solution is the actual interview question. Practise saying it in two sentences.",
        "Partition Labels needs the LAST index of each character first, then a sweep that extends the current partition's end.",
        "Hand of Straights: use a TreeMap or sorted counts so you always start a group from the smallest remaining card.",
        "Valid Parenthesis String with '*' is a greedy range — track the minimum and maximum possible open counts, clamping the minimum at zero.",
      ],
    },
    quiz: [
      {
        q: "Which coin system breaks the greedy 'always take the largest coin' strategy for target 6?",
        opts: ["{1, 5, 10}", "{1, 3, 4}", "{1, 2, 5}", "{2, 4, 8}"],
        a: 1,
        why: "Greedy gives 4 + 1 + 1 = three coins; the optimum is 3 + 3 = two. This is why Coin Change lives in the DP section, not this one.",
      },
      {
        q: "Gas Station: the total of gas[i] − cost[i] over all stations is non-negative. What follows?",
        opts: [
          "Nothing without further checking",
          "A valid starting station is guaranteed to exist",
          "Every station is a valid start",
          "The answer is always station 0",
        ],
        a: 1,
        why: "A non-negative total guarantees a solution, and the station right after the deepest deficit is one. Being able to argue this is the point of the problem.",
      },
      {
        q: "Valid Parenthesis String with wildcards is solved greedily by tracking:",
        opts: [
          "A stack of indices",
          "The minimum and maximum possible number of open brackets, clamping the minimum at zero",
          "A count of stars only",
          "Two passes with a counter",
        ],
        a: 1,
        why: "Each '*' widens the range of plausible open counts. If the maximum ever goes negative you have failed; if zero stays inside the range at the end, a valid assignment exists.",
      },
    ],
    probs: ["Maximum Subarray", "Jump Game", "Jump Game II", "Gas Station", "Hand of Straights", "Merge Triplets to Form Target Triplet", "Partition Labels", "Valid Parenthesis String"],
  },

  {
    id: "m21", week: 21, phase: 5,
    title: "Intervals and sweep line",
    tag: "Intervals",
    lesson: {
      big: "Your sweep-line note is exactly right, and this is where it pays off. The whole section reduces to one decision: what do you sort by? Sort by START to merge overlapping intervals. Sort by END to keep the most non-overlapping ones. Split each interval into a +1 event and a −1 event and sort those to count peak concurrency — which is Meeting Rooms II, the problem your notes already describe.",
      triggers: [
        "Pairs of (start, end): meetings, bookings, ranges",
        "\"merge\", \"insert\", \"how many rooms\", \"maximum overlap\"",
        "\"minimum removals so nothing overlaps\"",
      ],
      code: {
        title: "The three sorts",
        body: `// MERGE: sort by start, extend or push
intervals.sort((a, b) -> a[0] - b[0]);
for (int[] cur : intervals) {
    int[] last = res.isEmpty() ? null : res.get(res.size() - 1);
    if (last != null && cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]);
    else res.add(cur);
}

// MAX NON-OVERLAPPING: sort by END, take greedily
intervals.sort((a, b) -> a[1] - b[1]);

// PEAK CONCURRENCY (your sweep line): +1 at start, -1 at end
// tie-break so that an END is processed before a START at the same time,
// if touching intervals do NOT count as overlapping.
Arrays.sort(events, (a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);`,
      },
      cost: "O(n log n), dominated by the sort. The sweep itself is linear.",
      traps: [
        "Sorting by start for the non-overlapping problem. It looks reasonable and is wrong — the greedy that maximises the count keeps the interval that FREES UP EARLIEST.",
        "Tie-breaking at equal timestamps. If [1,2] and [2,3] do not count as overlapping, the −1 event must be processed before the +1. Ask the interviewer which convention applies.",
        "Meeting Rooms II has a second solution worth knowing: a min-heap of end times. Push each meeting's end; if the earliest end is ≤ the new start, pop and reuse that room. Heap size is the answer.",
        "Insert Interval does not need a sort at all — the input is already sorted, so it is three linear passes: before, overlapping (merge), after.",
        "Minimum Interval to Include Each Query: sort queries and intervals together and use a heap keyed by interval length — offline processing is the trick.",
      ],
    },
    quiz: [
      {
        q: "To keep the maximum number of NON-overlapping intervals, sort by:",
        opts: ["Start ascending", "End ascending", "Length ascending", "Start descending"],
        a: 1,
        why: "Taking the interval that ends earliest leaves the most room for everything after it. Sorting by start can pick one long interval that blocks several short ones.",
      },
      {
        q: "Your sweep line assigns +1 to starts and −1 to ends. If [1,2] and [2,3] should NOT count as overlapping, what must be true of the sort?",
        opts: [
          "Starts come before ends at equal timestamps",
          "Ends come before starts at equal timestamps",
          "Order at ties is irrelevant",
          "Timestamps must be made unique first",
        ],
        a: 1,
        why: "Processing the −1 first drops the count back to zero before the next meeting opens, so the peak is 1 rather than 2. This tie-break is the whole edge case.",
      },
      {
        q: "The heap-based solution to Meeting Rooms II returns which quantity?",
        opts: [
          "The largest end time in the heap",
          "The final size of the heap",
          "The number of pops performed",
          "The sum of all meeting lengths",
        ],
        a: 1,
        why: "Each element in the heap is a room currently in use. It only grows when no existing room has freed up, so its maximum size is the number of rooms required.",
      },
    ],
    probs: ["Insert Interval", "Merge Intervals", "Non Overlapping Intervals", "Meeting Rooms", "Meeting Rooms II", "Minimum Interval to Include Each Query"],
  },

  /* ============================ PHASE 6 ============================ */
  {
    id: "m22", week: 22, phase: 6,
    title: "Matrices, math and bits",
    tag: "Math & Bit Manipulation",
    lesson: {
      big: "The grab-bag section. Two ideas cover most of it. Matrix problems are index transformations — rotating in place is a transpose followed by a row reversal, and spiral traversal is four shrinking boundaries. Bit problems lean on two identities: XOR cancels equal pairs, and x & (x − 1) clears the lowest set bit. Neither topic rewards deep study; both punish you for never having seen them.",
      triggers: [
        "\"rotate\", \"spiral\", \"in place\" on a matrix",
        "\"without using extra space\" plus \"every element appears twice except one\" → XOR",
        "\"count the set bits\", \"without the + operator\"",
        "Overflow language: \"assume a 32-bit signed integer\"",
      ],
      code: {
        title: "The identities worth memorising",
        body: `// Rotate 90° clockwise, in place: transpose, then reverse each row
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++) {
        int tmp = m[i][j]; m[i][j] = m[j][i]; m[j][i] = tmp;
    }
for (int[] row : m)
    for (int l = 0, r = n - 1; l < r; l++, r--) {
        int tmp = row[l]; row[l] = row[r]; row[r] = tmp;
    }

// XOR cancels pairs: a ^ a == 0, a ^ 0 == a
int single = 0;
for (int x : nums) single ^= x;          // Single Number

// Clear the lowest set bit -> counts 1-bits in O(number of set bits)
while (x != 0) { x &= (x - 1); count++; }

// Counting Bits, DP form: bits[i] = bits[i >> 1] + (i & 1)

// Java: use >>> for unsigned right shift. >> keeps the sign bit.`,
      },
      cost: "Matrix work is O(n²) but O(1) extra space when done in place. Bit tricks are O(1) or O(bits).",
      traps: [
        "Java's >> is arithmetic (sign-extending) and >>> is logical. Reverse Bits and any loop over a negative number needs >>>, or it never terminates.",
        "Reverse Integer must detect overflow BEFORE it happens: check result against Integer.MAX_VALUE / 10 prior to multiplying.",
        "Pow(x, n): handle negative n by inverting the base, and guard n = Integer.MIN_VALUE, whose negation overflows.",
        "Spiral Matrix: shrink four boundaries and re-check them before the bottom and left passes, or a single-row remainder gets traversed twice.",
        "Set Matrix Zeroes in O(1) space uses the first row and column as marker storage, with two separate flags for the first row and first column themselves.",
      ],
    },
    quiz: [
      {
        q: "Rotating an n×n matrix 90° clockwise in place is:",
        opts: [
          "Reverse each row, then transpose",
          "Transpose, then reverse each row",
          "Reverse each column, then transpose",
          "Transpose twice",
        ],
        a: 1,
        why: "Transposing mirrors across the main diagonal; reversing rows then flips left-to-right. Reversing first gives the counter-clockwise rotation.",
      },
      {
        q: "What does `x & (x - 1)` do?",
        opts: [
          "Sets the lowest bit",
          "Clears the lowest SET bit",
          "Isolates the highest bit",
          "Negates x",
        ],
        a: 1,
        why: "Subtracting 1 flips the lowest set bit to 0 and all bits below it to 1; the AND then wipes them. Loop it and you count set bits in as many steps as there are ones.",
      },
      {
        q: "Reverse Bits on a negative Java int loops forever if you use `>>` because:",
        opts: [
          "Negative numbers have more bits",
          "`>>` sign-extends, so the leading 1s never shift out and x never reaches 0",
          "Java throws on negative shifts",
          "The loop condition is wrong",
        ],
        a: 1,
        why: "Arithmetic shift preserves the sign bit. `>>>` shifts in zeros, which is what you want for bit-level manipulation.",
      },
    ],
    probs: ["Rotate Image", "Spiral Matrix", "Set Matrix Zeroes", "Happy Number", "Plus One", "Pow(x, n)", "Multiply Strings", "Detect Squares", "Single Number", "Number of 1 Bits", "Counting Bits", "Reverse Bits", "Missing Number", "Sum of Two Integers", "Reverse Integer"],
  },

  {
    id: "m23", week: 23, phase: 6,
    title: "Hard problem gauntlet",
    tag: "Review",
    checkpoint: true,
    lesson: {
      big: "Every hard problem in the 150 is a medium from an earlier module, plus one twist. Trapping Rain Water is two pointers plus running maxima. Minimum Window Substring is a window plus a satisfied-count. Word Ladder is BFS on an implicit graph. Nothing here is new material — the goal is proving you can find the medium hiding inside a hard, which is the actual skill a senior loop tests.",
      triggers: [],
      drill: [
        "Work the hards you skipped, one per day, 45-minute timer. Order them easiest first: Trapping Rain Water, Minimum Window Substring, Sliding Window Maximum, Largest Rectangle In Histogram, Word Ladder, Merge K Sorted Lists, Reverse Nodes In K Group, Binary Tree Maximum Path Sum, Serialize And Deserialize Binary Tree, Find Median From Data Stream, N Queens, Word Search II, Alien Dictionary, Median of Two Sorted Arrays.",
        "Before coding each one, write down which MEDIUM pattern it extends and what the twist is. If you cannot name the base pattern, that medium module is the real gap — go back to it.",
        "When you are stuck at 45 minutes, read only the approach paragraph of the editorial, close it, and implement from memory. Never copy the code.",
        "Re-solve anything you needed help on, 48 hours later, from scratch.",
      ],
      cost: "Roughly one hard per day. Fourteen hard problems, but you will not have skipped all of them.",
      traps: [
        "Grinding hards you cannot start. If the base pattern isn't solid, a hard teaches you nothing except discouragement — go back to the medium.",
        "Most FAANG loops are two mediums under time pressure, not one hard. Hards buy you confidence and range, not a passing score by themselves.",
      ],
    },
    quiz: [],
    probs: [],
  },

  {
    id: "m24", week: 24, phase: 6,
    title: "The interview loop itself",
    tag: "Review",
    checkpoint: true,
    lesson: {
      big: "Two people write identical code and one fails. The difference is the forty seconds before the first line and the two minutes after the last. Interviewers score signal — how you handle ambiguity, whether you test your own work, whether you can be corrected without falling apart. Run the same seven-step script every time until it is automatic, then it costs you no thought under pressure.",
      triggers: [],
      drill: [
        "CLARIFY — restate the problem in your words. Ask about input size, duplicates, empty input, negative numbers, and what to return on failure. Two questions minimum, always.",
        "EXAMPLE — write one small input and its expected output by hand. Half of all misunderstandings die here.",
        "BRUTE FORCE — state it and its complexity out loud. Never code it. This banks credit and buys thinking time.",
        "OPTIMISE — name the bottleneck, then name the pattern that removes it. \"The repeated scan is the problem; a hash map makes it a lookup.\"",
        "CODE — narrate as you type. Silence reads as being stuck. Use real variable names.",
        "TEST — walk your own example through the code by hand, then an edge case. Find your own bug before they point at it.",
        "COMPLEXITY — time and space, and say what you would change if the input were a hundred times larger.",
        "Behavioural: write five STAR stories (conflict, failure, leadership, ambiguity, the thing you're proudest of). One story can serve several prompts. Rehearse out loud, not in your head — target two minutes each.",
        "Book three real mocks in this final week. The gap between practising alone and performing is real, and it shrinks fastest with repetition.",
      ],
      cost: "By this stage the marginal value of one more new problem sits far below the marginal value of a rehearsed loop.",
      traps: [
        "Jumping straight to code because you recognised the problem. Interviewers grade communication explicitly, and instant recognition without clarification often reads as memorisation.",
        "Going quiet while thinking. Say \"let me think about the data structure for a moment\" — narration is free credit.",
        "Getting defensive at a hint. A hint is an invitation. Take it, say thank you, and move.",
        "Neglecting behavioural prep. It is the most commonly failed round among strong coders, and the easiest one to prepare for.",
      ],
    },
    quiz: [],
    probs: [],
  }
);

/* ------------------------------------------------------------------ *
 *  Pass 1 "recon" layer: the 60-second version of every pattern,
 *  plus the two anchor problems that prove you have seen it.
 * ------------------------------------------------------------------ */
const SPRINT = {
  m1: { one: "Write down what you have seen in a hash map, and one pass replaces two nested loops.",
        anchors: ["Two Sum", "Group Anagrams"] },
  m2: { one: "Two indices moving inward, where each move provably throws away a region you no longer need.",
        anchors: ["Valid Palindrome", "3Sum"] },
  m3: { one: "A window [l, r] with one invariant: r expands to include, l contracts while the invariant is broken.",
        anchors: ["Best Time to Buy And Sell Stock", "Longest Substring Without Repeating Characters"] },
  m4: { one: "A stack of not-yet-beaten candidates; when something beats them they pop and their answer is fixed.",
        anchors: ["Valid Parentheses", "Daily Temperatures"] },
  m5: { one: "Binary search needs a monotonic yes/no predicate, not a sorted array — so you can search an answer range.",
        anchors: ["Binary Search", "Koko Eating Bananas"] },
  m6: { one: "Dummy node, fast/slow pair, in-place reversal. Every list problem is a composition of those three.",
        anchors: ["Reverse Linked List", "LRU Cache"] },
  m7: { one: "To keep the k largest, hold a MIN-heap of size k — its root is the weakest survivor, so it is what you evict.",
        anchors: ["Kth Largest Element In An Array", "K Closest Points to Origin"] },
  m9: { one: "Decide what each call RETURNS to its parent versus what it UPDATES globally. That is the whole difficulty.",
        anchors: ["Maximum Depth of Binary Tree", "Diameter of Binary Tree"] },
  m10: { one: "Snapshot the queue size at the top of each round, then drain exactly that many — that is level-by-level.",
        anchors: ["Binary Tree Level Order Traversal", "Binary Tree Right Side View"] },
  m11: { one: "In-order on a BST is sorted, and validation needs a range handed down from ancestors, not a parent check.",
        anchors: ["Validate Binary Search Tree", "Kth Smallest Element In a Bst"] },
  m12: { one: "Share prefixes so a lookup costs the word's length, no matter how big the dictionary is.",
        anchors: ["Implement Trie Prefix Tree", "Design Add And Search Words Data Structure"] },
  m13: { one: "A grid is a graph with the neighbour list left implicit. Seed BFS with every source at once for distances.",
        anchors: ["Number of Islands", "Rotting Oranges"] },
  m14: { one: "Choose, recurse, undo. The template is decided by the decision tree's shape, so draw it for n = 3 first.",
        anchors: ["Subsets", "Combination Sum"] },
  m15: { one: "Repeatedly take any task with no remaining prerequisites. If some never reach zero, there is a cycle.",
        anchors: ["Course Schedule", "Course Schedule II"] },
  m16: { one: "Union-Find answers 'connected yet?' as edges arrive; Dijkstra is BFS with a priority queue for weights.",
        anchors: ["Number of Connected Components In An Undirected Graph", "Network Delay Time"] },
  m17: { one: "Say the state as an English sentence before coding. 'Best up to i' and 'best ending at i' are different.",
        anchors: ["Climbing Stairs", "House Robber"] },
  m18: { one: "Knapsack: the inner loop's direction decides whether an item is reusable. Forward = unlimited, backward = once.",
        anchors: ["Coin Change", "Longest Increasing Subsequence"] },
  m19: { one: "Two moving quantities means a 2-D table. Ends match, take the diagonal; otherwise drop one side.",
        anchors: ["Unique Paths", "Longest Common Subsequence"] },
  m20: { one: "Only commit to greedy if you can state the exchange argument in one sentence. Otherwise it is DP.",
        anchors: ["Maximum Subarray", "Jump Game"] },
  m21: { one: "The only decision is what you sort by: start to merge, end to maximise count, ±1 events to count overlap.",
        anchors: ["Merge Intervals", "Meeting Rooms II"] },
  m22: { one: "Rotate = transpose then reverse rows. XOR cancels pairs. x & (x-1) clears the lowest set bit.",
        anchors: ["Rotate Image", "Single Number"] },
};

MODULES.forEach((m) => {
  const s = SPRINT[m.id];
  if (s) { m.one = s.one; m.anchors = s.anchors; }
});

/* A company-targeted sprint module for pass 3 */
MODULES.push({
  id: "m25", week: 20, phase: 6,
  title: "Company-targeted sprint",
  tag: "Review",
  checkpoint: true,
  lesson: {
    big: "By now you have the patterns. This block is about aiming them. Open the Companies view, enter whoever you are talking to, and work their high-frequency list from the top. Company tags do carry a real signal about house style — Meta leans on Valid Palindrome, Merge Intervals and Right Side View; Amazon on LRU Cache, Number of Islands and Trapping Rain Water; Google spreads wider and pushes further into graphs and DP.",
    triggers: [],
    drill: [
      "Enter every company you have applied to in the Companies view and read its top ten. Anything unsolved there goes on this week's list.",
      "Treat the ordering as a hint, not a promise. Tags are crowd-sourced from what candidates report, they lag reality by months, and no company reuses a list forever.",
      "Weight the recency marker. A problem reported in the last six months deserves more of your time than one last seen three years ago.",
      "For each company, read three recent write-ups on Blind or Glassdoor for the round structure — how many rounds, which are system design, shared editor or whiteboard.",
      "If an onsite is already booked, stop working the schedule and run the Triage view instead.",
    ],
    cost: "Two focused weeks, compressible to two days when a loop lands early.",
    traps: [
      "Memorising a company's tagged list instead of the patterns behind it. Tags shift every quarter; patterns do not.",
      "Letting a narrow-looking list talk you out of the fundamentals. Interviewers improvise, and the base pattern is what saves you when they do.",
    ],
  },
  quiz: [],
  probs: [],
});

/* ------------------------------------------------------------------ *
 *  Three passes over the same 21 patterns
 * ------------------------------------------------------------------ */
const PLAN = [
  {
    pass: 1, name: "Recon", weeks: "Weeks 1–4", short: "Touch everything",
    blurb: "Every one of the 21 patterns, fast, with two anchor problems each. Mastery is not the aim here — the aim is that no interview question is a total stranger, which is worth having early whether the runway is four weeks or six months.",
    rows: [
      { week: 1, label: "Arrays, strings, search, lists", mods: ["m1", "m2", "m3", "m4", "m5", "m6"] },
      { week: 2, label: "Trees and grid graphs", mods: ["m9", "m10", "m11", "m13", "m15"] },
      { week: 3, label: "Heaps, backtracking, intervals", mods: ["m7", "m14", "m12", "m16", "m21"] },
      { week: 4, label: "DP, greedy, math and bits", mods: ["m17", "m18", "m19", "m20", "m22"] },
    ],
  },
  {
    pass: 2, name: "Depth", weeks: "Weeks 5–16", short: "Make it stick",
    blurb: "The full lesson, the quiz, and the remaining problems — ordered by how broadly big tech asks each pattern, so if you run out of time you run out at the bottom of the list rather than the top.",
    rows: [
      { week: 5, label: "Highest-yield array work", mods: ["m1", "m2", "m3"] },
      { week: 6, label: "Stack and search", mods: ["m4", "m5"] },
      { week: 7, label: "Lists and heaps", mods: ["m6", "m7"] },
      { week: 8, label: "Checkpoint: first mock loop", mods: ["m8"] },
      { week: 9, label: "Tree recursion and BFS", mods: ["m9", "m10"] },
      { week: 10, label: "BSTs and tries", mods: ["m11", "m12"] },
      { week: 11, label: "Grids and backtracking", mods: ["m13", "m14"] },
      { week: 12, label: "Ordering and connectivity", mods: ["m15", "m16"] },
      { week: 13, label: "DP foundations", mods: ["m17", "m18"] },
      { week: 14, label: "2-D DP and greedy", mods: ["m19", "m20"] },
      { week: 15, label: "Intervals, math, bits", mods: ["m21", "m22"] },
      { week: 16, label: "Catch-up and re-solve your misses", mods: [] },
    ],
  },
  {
    pass: 3, name: "Pressure", weeks: "Weeks 17–24", short: "Perform it",
    blurb: "Stop learning and start performing. Hard problems, timed sets you have never seen, aiming at specific companies, and rehearsing the loop itself.",
    rows: [
      { week: 17, label: "Hard gauntlet", mods: ["m23"] },
      { week: 18, label: "Hard gauntlet", mods: ["m23"] },
      { week: 19, label: "Mixed timed sets, random order", mods: [] },
      { week: 20, label: "Company sprint", mods: ["m25"] },
      { week: 21, label: "Company sprint", mods: ["m25"] },
      { week: 22, label: "Mock loops", mods: ["m24"] },
      { week: 23, label: "Mock loops", mods: ["m24"] },
      { week: 24, label: "Behavioural, then rest", mods: ["m24"] },
    ],
  },
];

/* How broadly big tech asks each pattern — drives ordering everywhere. */
const YIELD_ORDER = ["m1", "m6", "m3", "m2", "m5", "m4", "m13", "m15", "m21",
  "m18", "m14", "m22", "m7", "m17", "m20", "m10", "m12", "m9", "m19", "m16", "m11"];

const TEACHING = YIELD_ORDER.map((id) => MODULES.find((m) => m.id === id));
const CHECKPOINTS = ["m8", "m23", "m25", "m24"].map((id) => MODULES.find((m) => m.id === id));

/* ------------------------------------------------------------------ *
 *  Derived indices
 * ------------------------------------------------------------------ */
const NAME_BY_IDX = RAW.map((r) => r[0]);
const IDX_BY_NAME = {};
NAME_BY_IDX.forEach((n, i) => (IDX_BY_NAME[n] = i));

/* probIdx -> [{ c: companyIdx, f: 1..5, recent: bool }] sorted by f desc */
const TAGS = NAME_BY_IDX.map(() => []);
CT.forEach((entries, ci) => {
  entries.forEach(([pi, code]) => {
    TAGS[pi].push({ c: ci, f: code % 10, recent: code >= 10 });
  });
});
TAGS.forEach((t) => t.sort((a, b) => b.f - a.f));

/* how broadly each problem is asked, for the "any big tech" ranking */
const BREADTH = TAGS.map((t) => t.reduce((s, x) => s + x.f, 0));

const FREQ_LABEL = ["", "50%", "63%", "75%", "88%", "100%"];

/* ------------------------------------------------------------------ *
 *  Mastery: points earned per pattern, and the level they buy
 * ------------------------------------------------------------------ */
const PTS = { E: 10, M: 20, H: 35 };
const QUIZ_PTS = 10;
const NOTE_PTS = 10;
const NOTE_MIN = 80;

const LEVELS = [
  { n: "Unseen", at: 0, c: "var(--ink2)" },
  { n: "Aware", at: 1, c: "var(--ink2)" },
  { n: "Familiar", at: 25, c: "var(--amber)" },
  { n: "Working", at: 50, c: "var(--amber)" },
  { n: "Fluent", at: 75, c: "var(--violet)" },
  { n: "Interview-ready", at: 92, c: "var(--green)" },
];
const levelFor = (pct) => {
  let i = 0;
  LEVELS.forEach((l, k) => { if (pct >= l.at) i = k; });
  return i;
};

function masteryFor(mod, st) {
  if (!mod.probs.length) return null;
  let pts = 0, max = 0;
  mod.probs.forEach((n) => {
    const v = PTS[P(n).diff];
    max += v;
    if (st.solved[n]) pts += v;
  });
  const picks = st.picks[mod.id] || {};
  max += mod.quiz.length * QUIZ_PTS;
  mod.quiz.forEach((q, i) => { if (picks[i] === q.a) pts += QUIZ_PTS; });
  max += NOTE_PTS;
  if ((st.notes[mod.id] || "").trim().length >= NOTE_MIN) pts += NOTE_PTS;

  const pct = Math.round((pts / max) * 100);
  const lvl = levelFor(pct);
  const nextAt = lvl < LEVELS.length - 1 ? LEVELS[lvl + 1].at : null;
  const toNext = nextAt == null ? 0 : Math.max(1, Math.ceil((nextAt / 100) * max) - pts);
  return { pts, max, pct, lvl, level: LEVELS[lvl], next: nextAt == null ? null : LEVELS[lvl + 1], toNext };
}

const totalXP = (st) =>
  TEACHING.reduce((sum, m) => sum + (masteryFor(m, st) || { pts: 0 }).pts, 0);

const today = () => new Date().toISOString().slice(0, 10);
const yesterday = () => new Date(Date.now() - 86400000).toISOString().slice(0, 10);


function companyScoreForModule(ci, mod) {
  let score = 0, hits = 0;
  mod.probs.forEach((n) => {
    const hit = TAGS[IDX_BY_NAME[n]].find((t) => t.c === ci);
    if (hit) { score += hit.f; hits++; }
  });
  return { score, hits };
}

/* How many of the 150 each company tags at all — used as a prominence weight,
   since frequency % is relative within a company and would otherwise let a
   narrow list (say Qualcomm's) outrank Amazon's. */
const CO_BREADTH = CT.map((e) => e.length);

/* top companies for a module: summed frequency, weighted by company breadth */
function topCompaniesForModule(mod, limit) {
  const acc = {};
  mod.probs.forEach((n) => {
    TAGS[IDX_BY_NAME[n]].forEach((t) => {
      if (t.f >= 3) acc[t.c] = (acc[t.c] || 0) + t.f;
    });
  });
  return Object.entries(acc)
    .map(([ci, s]) => [+ci, s * Math.sqrt(CO_BREADTH[+ci])])
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit || 6)
    .map(([ci]) => CO[ci]);
}

/* ------------------------------------------------------------------ *
 *  Persistence
 * ------------------------------------------------------------------ */
const KEY = "algo-lms-v2";

async function loadState() {
  try {
    const r = await window.storage.get(KEY);
    return r ? JSON.parse(r.value) : null;
  } catch (e) { return null; }
}
async function saveState(s) {
  try { await window.storage.set(KEY, JSON.stringify(s)); } catch (e) { /* session still works */ }
}
const freshState = () => {
  const solved = {};
  ALREADY_SOLVED.forEach((n) => (solved[n] = true));
  return {
    solved, picks: {}, notes: {},
    start: new Date().toISOString().slice(0, 10),
    lastDay: null, streak: 0, bestStreak: 0,
  };
};

/* ------------------------------------------------------------------ *
 *  Styles
 * ------------------------------------------------------------------ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

.a-root{
  --paper:#EDEFF4; --card:#FFFFFF; --ink:#141821; --ink2:#5B6472;
  --rule:#D5D9E2; --rule2:#E6E9F0;
  --violet:#4733C9; --violet-t:#ECE9FD;
  --amber:#A66A00; --amber-t:#FBF0D9;
  --green:#146253; --green-t:#DFEFEA;
  --rose:#9E2440; --rose-t:#FAE5EA;
  --disp:'Space Grotesk',ui-sans-serif,system-ui,sans-serif;
  --body:'Inter',ui-sans-serif,system-ui,-apple-system,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,'SFMono-Regular',Menlo,monospace;
  font-family:var(--body);color:var(--ink);background:var(--paper);
  background-image:linear-gradient(var(--rule2) 1px,transparent 1px),
    linear-gradient(90deg,var(--rule2) 1px,transparent 1px);
  background-size:28px 28px;min-height:100vh;padding:0 0 64px;-webkit-font-smoothing:antialiased;
}
.a-root *{box-sizing:border-box;}
.a-wrap{max-width:1180px;margin:0 auto;padding:0 20px;}
.a-head{padding:32px 0 18px;}
.a-eyebrow{font-family:var(--mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;
  color:var(--violet);font-weight:600;margin:0 0 10px;}
.a-h1{font-family:var(--disp);font-weight:700;font-size:clamp(28px,4.6vw,46px);line-height:1.02;
  letter-spacing:-.028em;margin:0 0 8px;}
.a-sub{color:var(--ink2);font-size:14.5px;max-width:62ch;margin:0;line-height:1.55;}
.a-meters{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0 0;}
.a-meter{background:var(--card);border:1px solid var(--rule);border-radius:3px;padding:11px 15px;min-width:132px;}
.a-meter b{display:block;font-family:var(--disp);font-size:23px;font-weight:700;letter-spacing:-.02em;line-height:1.1;}
.a-meter i{font-style:normal;font-size:14px;color:var(--ink2);}
.a-meter span{font-family:var(--mono);font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink2);}
.a-meter.hi{background:var(--violet);border-color:var(--violet);}
.a-meter.hi b,.a-meter.hi span,.a-meter.hi i{color:#fff;}
.a-meter.hi span{opacity:.75;}

/* lattice */
.a-lat-box{background:var(--card);border:1px solid var(--rule);border-radius:3px;padding:16px 16px 12px;margin:14px 0 20px;}
.a-lat-top{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:12px;flex-wrap:wrap;}
.a-lat-title{font-family:var(--mono);font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--ink2);}
.a-lat{display:flex;flex-wrap:wrap;gap:9px;}
.a-lat-grp{display:flex;flex-direction:column;gap:4px;cursor:pointer;}
.a-lat-cells{display:flex;gap:2px;}
.a-cell{width:9px;height:16px;border-radius:1px;background:var(--rule2);border-bottom:2px solid var(--rule);}
.a-cell.s{background:var(--violet);border-bottom-color:var(--violet);}
.a-cell.anc{background:var(--amber-t);}
.a-cell.anc.s{background:var(--violet);}
.a-cell.dE{border-bottom-color:var(--green);} .a-cell.dM{border-bottom-color:var(--amber);}
.a-cell.dH{border-bottom-color:var(--rose);}
.a-cell.s.dE,.a-cell.s.dM,.a-cell.s.dH{border-bottom-color:var(--violet);}
.a-lat-lab{font-family:var(--mono);font-size:8px;color:var(--ink2);text-align:center;
  max-width:64px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.a-lat-grp.touched .a-lat-lab{color:var(--violet);font-weight:600;}
.a-legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:14px;font-family:var(--mono);font-size:9.5px;color:var(--ink2);}
.a-lg{display:flex;align-items:center;gap:5px;}
.a-lg i{width:8px;height:12px;border-radius:1px;display:block;background:var(--rule2);}

/* top nav */
.a-nav{display:flex;gap:0;border-bottom:1px solid var(--rule);margin-bottom:22px;overflow-x:auto;}
.a-navtab{background:none;border:0;border-bottom:2px solid transparent;padding:11px 0;margin-right:26px;
  cursor:pointer;font-family:var(--mono);font-size:11px;letter-spacing:.13em;text-transform:uppercase;
  color:var(--ink2);white-space:nowrap;}
.a-navtab:hover{color:var(--ink);}
.a-navtab.on{color:var(--violet);border-bottom-color:var(--violet);font-weight:600;}
.a-navtab:focus-visible{outline:2px solid var(--violet);outline-offset:2px;}

/* pass cards */
.a-pass{background:var(--card);border:1px solid var(--rule);border-radius:3px;margin-bottom:16px;overflow:hidden;}
.a-passhead{padding:18px 22px;border-bottom:1px solid var(--rule2);}
.a-passhead.now{background:var(--violet-t);}
.a-passno{font-family:var(--mono);font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--violet);font-weight:600;}
.a-passname{font-family:var(--disp);font-size:22px;font-weight:700;letter-spacing:-.02em;margin:3px 0 6px;}
.a-passblurb{font-size:13.5px;line-height:1.6;color:var(--ink2);margin:0;max-width:74ch;}
.a-wkrow{display:flex;gap:14px;padding:11px 22px;border-bottom:1px solid var(--rule2);align-items:baseline;flex-wrap:wrap;}
.a-wkrow:last-child{border-bottom:0;}
.a-wkrow.now{background:var(--amber-t);}
.a-wkno{font-family:var(--mono);font-size:10px;color:var(--ink2);min-width:52px;letter-spacing:.08em;}
.a-wkrow.now .a-wkno{color:var(--amber);font-weight:600;}
.a-wklab{font-size:13px;flex:1 1 190px;color:var(--ink2);}
.a-wkmods{display:flex;gap:6px;flex-wrap:wrap;}
.a-mchip{font-size:11.5px;background:var(--paper);border:1px solid var(--rule);border-radius:2px;
  padding:3px 8px;cursor:pointer;font-family:var(--body);color:var(--ink);}
.a-mchip:hover{border-color:var(--violet);color:var(--violet);background:var(--violet-t);}
.a-mchip.done{border-color:var(--green);color:var(--green);background:var(--green-t);}

/* layout */
.a-grid{display:grid;grid-template-columns:250px 1fr;gap:26px;align-items:start;}
@media (max-width:880px){.a-grid{grid-template-columns:1fr;}}
.a-rail{position:sticky;top:16px;max-height:calc(100vh - 32px);overflow-y:auto;background:var(--card);
  border:1px solid var(--rule);border-radius:3px;padding:6px;}
@media (max-width:880px){.a-rail{position:static;max-height:none;}}
.a-phase{font-family:var(--mono);font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink2);
  padding:14px 10px 6px;border-top:1px solid var(--rule2);margin-top:4px;}
.a-phase:first-child{border-top:0;margin-top:0;padding-top:8px;}
.a-navbtn{display:flex;width:100%;text-align:left;gap:9px;align-items:center;background:none;border:0;
  padding:7px 9px;border-radius:2px;cursor:pointer;font-family:var(--body);font-size:12.5px;color:var(--ink);line-height:1.3;}
.a-navbtn:hover{background:var(--paper);}
.a-navbtn.on{background:var(--violet-t);font-weight:600;}
.a-navbtn:focus-visible{outline:2px solid var(--violet);outline-offset:-2px;}
.a-rank{font-family:var(--mono);font-size:9px;color:var(--ink2);min-width:16px;}
.a-ring{margin-left:auto;font-family:var(--mono);font-size:9px;color:var(--ink2);}
.a-ring.full{color:var(--green);font-weight:600;}

/* panel */
.a-panel{background:var(--card);border:1px solid var(--rule);border-radius:3px;overflow:hidden;}
.a-ptop{padding:22px 26px 0;}
@media (max-width:520px){.a-ptop{padding:18px 16px 0;}}
.a-crumb{display:flex;gap:8px;align-items:center;font-family:var(--mono);font-size:10px;letter-spacing:.12em;
  text-transform:uppercase;color:var(--ink2);margin-bottom:9px;flex-wrap:wrap;}
.a-chip{background:var(--violet-t);color:var(--violet);padding:2px 7px;border-radius:2px;font-weight:600;}
.a-h2{font-family:var(--disp);font-weight:700;font-size:clamp(22px,3.4vw,32px);letter-spacing:-.022em;margin:0 0 12px;line-height:1.08;}
.a-cos{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 16px;align-items:center;}
.a-colab{font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink2);margin-right:2px;}
.a-co{font-family:var(--mono);font-size:10.5px;background:var(--amber-t);color:var(--amber);
  padding:3px 8px;border-radius:2px;font-weight:600;}
.a-co.sm{font-size:9px;padding:2px 5px;background:var(--paper);color:var(--ink2);font-weight:400;}
.a-tabs{display:flex;border-bottom:1px solid var(--rule);margin:0 -26px;padding:0 26px;overflow-x:auto;}
@media (max-width:520px){.a-tabs{margin:0 -16px;padding:0 16px;}}
.a-tab{background:none;border:0;border-bottom:2px solid transparent;padding:9px 2px;margin-right:22px;cursor:pointer;
  font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink2);white-space:nowrap;}
.a-tab:hover{color:var(--ink);}
.a-tab.on{color:var(--violet);border-bottom-color:var(--violet);font-weight:600;}
.a-tab:focus-visible{outline:2px solid var(--violet);outline-offset:2px;}
.a-body{padding:24px 26px 28px;}
@media (max-width:520px){.a-body{padding:20px 16px 24px;}}
.a-big{font-size:15.5px;line-height:1.66;margin:0 0 24px;}
.a-one{font-family:var(--disp);font-size:clamp(17px,2.4vw,22px);line-height:1.42;font-weight:500;
  letter-spacing:-.012em;margin:0 0 22px;border-left:3px solid var(--violet);padding-left:16px;}
.a-lab{font-family:var(--mono);font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--ink2);margin:0 0 10px;}
.a-ul{list-style:none;padding:0;margin:0 0 24px;}
.a-ul li{position:relative;padding-left:20px;margin-bottom:8px;font-size:14px;line-height:1.6;}
.a-ul li:before{content:"";position:absolute;left:2px;top:9px;width:7px;height:1.5px;background:var(--violet);}
.a-ul.warn li:before{background:var(--amber);}
.a-code{background:#14161D;border-radius:3px;padding:16px 18px;overflow-x:auto;margin:0 0 8px;}
.a-code pre{margin:0;font-family:var(--mono);font-size:12.2px;line-height:1.62;color:#E4E7EE;white-space:pre;}
.a-codetitle{font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink2);margin:0 0 8px;}
.a-cost{font-size:13.5px;line-height:1.6;color:var(--ink2);background:var(--paper);border-left:2px solid var(--violet);
  padding:11px 14px;margin:0 0 26px;border-radius:0 2px 2px 0;}

/* quiz */
.a-dots{display:flex;gap:5px;margin-bottom:18px;}
.a-dot{width:26px;height:3px;border-radius:2px;background:var(--rule);}
.a-dot.done{background:var(--violet);} .a-dot.wrong{background:var(--rose);}
.a-q{font-size:16.5px;line-height:1.5;font-weight:500;margin:0 0 18px;}
.a-opt{display:block;width:100%;text-align:left;background:var(--card);border:1px solid var(--rule);border-radius:3px;
  padding:12px 15px;margin-bottom:8px;cursor:pointer;font-family:var(--body);font-size:14px;line-height:1.45;color:var(--ink);}
.a-opt:hover:not(:disabled){border-color:var(--violet);background:var(--violet-t);}
.a-opt:disabled{cursor:default;}
.a-opt:focus-visible{outline:2px solid var(--violet);outline-offset:1px;}
.a-opt.right{border-color:var(--green);background:var(--green-t);}
.a-opt.wrong{border-color:var(--rose);background:var(--rose-t);}
.a-optk{font-family:var(--mono);font-size:11px;color:var(--ink2);margin-right:9px;}
.a-why{border-left:2px solid var(--green);background:var(--green-t);padding:13px 15px;font-size:13.8px;line-height:1.6;
  border-radius:0 2px 2px 0;margin:14px 0 0;}
.a-why.no{border-left-color:var(--rose);background:var(--rose-t);}
.a-why b{font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;display:block;margin-bottom:5px;}
.a-score{font-family:var(--disp);font-size:40px;font-weight:700;letter-spacing:-.03em;margin:0;}

/* problem rows */
.a-prow{display:flex;align-items:center;gap:11px;padding:11px 4px;border-bottom:1px solid var(--rule2);flex-wrap:wrap;}
.a-prow:last-child{border-bottom:0;}
.a-box{width:17px;height:17px;flex:0 0 17px;border:1.5px solid var(--rule);border-radius:2px;background:var(--card);
  cursor:pointer;padding:0;position:relative;}
.a-box:hover{border-color:var(--violet);}
.a-box:focus-visible{outline:2px solid var(--violet);outline-offset:2px;}
.a-box.on{background:var(--violet);border-color:var(--violet);}
.a-box.on:after{content:"";position:absolute;left:5px;top:1.5px;width:4px;height:9px;border:solid #fff;
  border-width:0 2px 2px 0;transform:rotate(42deg);}
.a-pname{font-size:14px;flex:1 1 180px;line-height:1.35;}
.a-prow.on .a-pname{color:var(--ink2);text-decoration:line-through;text-decoration-color:var(--rule);}
.a-star{color:var(--amber);font-size:11px;margin-left:5px;}
.a-diff{font-family:var(--mono);font-size:9.5px;font-weight:600;padding:2px 6px;border-radius:2px;letter-spacing:.06em;}
.a-diff.E{background:var(--green-t);color:var(--green);}
.a-diff.M{background:var(--amber-t);color:var(--amber);}
.a-diff.H{background:var(--rose-t);color:var(--rose);}
.a-links{display:flex;gap:7px;}
.a-link{font-family:var(--mono);font-size:10px;letter-spacing:.06em;text-decoration:none;border:1px solid var(--rule);
  padding:4px 8px;border-radius:2px;color:var(--ink2);white-space:nowrap;}
.a-link:hover{border-color:var(--violet);color:var(--violet);background:var(--violet-t);}
.a-link.pri{border-color:var(--violet);color:var(--violet);}
.a-tagline{flex-basis:100%;display:flex;gap:5px;flex-wrap:wrap;padding-left:28px;margin-top:-2px;}
.a-fresh{font-family:var(--mono);font-size:8.5px;color:var(--green);background:var(--green-t);padding:2px 5px;border-radius:2px;}

/* company view */
.a-search{width:100%;border:1px solid var(--rule);border-radius:3px;padding:13px 16px;font-family:var(--body);
  font-size:15px;color:var(--ink);background:var(--card);}
.a-search:focus{outline:2px solid var(--violet);outline-offset:-1px;border-color:var(--violet);}
.a-colist{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0 0;}
.a-cobtn{font-family:var(--body);font-size:13px;background:var(--card);border:1px solid var(--rule);border-radius:2px;
  padding:6px 11px;cursor:pointer;color:var(--ink);}
.a-cobtn:hover{border-color:var(--violet);color:var(--violet);background:var(--violet-t);}
.a-cobtn.on{background:var(--violet);border-color:var(--violet);color:#fff;font-weight:600;}
.a-bar{display:flex;align-items:center;gap:11px;padding:8px 4px;border-bottom:1px solid var(--rule2);cursor:pointer;width:100%;
  background:none;border-left:0;border-right:0;border-top:0;text-align:left;font-family:var(--body);}
.a-bar:hover .a-barname{color:var(--violet);}
.a-barname{font-size:13.5px;flex:0 0 190px;color:var(--ink);}
@media (max-width:600px){.a-barname{flex:1 1 130px;}}
.a-bartrack{flex:1 1 auto;height:7px;background:var(--rule2);border-radius:2px;overflow:hidden;min-width:50px;}
.a-barfill{height:100%;background:var(--violet);}
.a-barnum{font-family:var(--mono);font-size:10px;color:var(--ink2);min-width:42px;text-align:right;}

/* misc */
.a-btn{font-family:var(--mono);font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;background:var(--violet);
  color:#fff;border:0;border-radius:2px;padding:10px 16px;cursor:pointer;font-weight:600;}
.a-btn:hover{background:#3a29a8;}
.a-btn:disabled{opacity:.4;cursor:default;}
.a-btn:focus-visible{outline:2px solid var(--ink);outline-offset:2px;}
.a-btn.ghost{background:none;color:var(--ink2);border:1px solid var(--rule);}
.a-btn.ghost:hover{color:var(--violet);border-color:var(--violet);background:var(--violet-t);}
.a-btn.ghost.on{background:var(--violet);border-color:var(--violet);color:#fff;}
.a-foot{display:flex;justify-content:space-between;gap:12px;margin-top:18px;flex-wrap:wrap;}
.a-note{font-size:12.5px;color:var(--ink2);line-height:1.6;margin:22px 0 0;}
.a-hr{height:1px;background:var(--rule2);border:0;margin:26px 0;}
.a-ta{width:100%;min-height:280px;border:1px solid var(--rule);border-radius:3px;padding:14px 16px;
  font-family:var(--mono);font-size:13px;line-height:1.65;resize:vertical;color:var(--ink);background:var(--card);}
.a-ta:focus{outline:2px solid var(--violet);outline-offset:-1px;border-color:var(--violet);}
.a-card{background:var(--card);border:1px solid var(--rule);border-radius:3px;padding:22px 26px;margin-bottom:16px;}
@media (max-width:520px){.a-card{padding:18px 16px;}}
.a-seg{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:6px;}

/* ---- mastery ---- */
.a-lvlpill{font-family:var(--mono);font-size:9px;letter-spacing:.08em;text-transform:uppercase;
  padding:2px 6px;border-radius:2px;font-weight:600;white-space:nowrap;}
.a-mtrack{height:6px;background:var(--rule2);border-radius:3px;overflow:hidden;}
.a-mfill{height:100%;border-radius:3px;transition:width .45s cubic-bezier(.2,.8,.2,1);}
.a-mbox{background:var(--paper);border:1px solid var(--rule);border-radius:3px;padding:14px 16px;margin:0 0 18px;}
.a-mtop{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:9px;flex-wrap:wrap;}
.a-mname{font-family:var(--disp);font-size:17px;font-weight:700;letter-spacing:-.015em;}
.a-mpct{font-family:var(--mono);font-size:11px;color:var(--ink2);}
.a-mnext{font-size:12.5px;color:var(--ink2);margin:9px 0 0;line-height:1.55;}
.a-railbar{margin-left:auto;width:38px;height:4px;background:var(--rule2);border-radius:2px;overflow:hidden;flex:0 0 38px;}
.a-railfill{height:100%;}

/* mastery board */
.a-board{display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:10px;}
.a-tile{background:var(--card);border:1px solid var(--rule);border-radius:3px;padding:12px 13px;cursor:pointer;text-align:left;
  font-family:var(--body);}
.a-tile:hover{border-color:var(--violet);}
.a-tile:focus-visible{outline:2px solid var(--violet);outline-offset:1px;}
.a-tilename{font-size:13px;font-weight:600;margin-bottom:3px;line-height:1.25;}
.a-tilemeta{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:7px;gap:6px;}

/* level-up toast */
.a-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:60;background:var(--ink);
  color:#fff;border-radius:4px;padding:14px 20px;box-shadow:0 10px 34px rgba(15,20,32,.3);
  display:flex;gap:13px;align-items:center;max-width:min(92vw,430px);animation:a-rise .32s cubic-bezier(.2,.9,.25,1);}
@keyframes a-rise{from{opacity:0;transform:translate(-50%,14px);}to{opacity:1;transform:translate(-50%,0);}}
.a-toastlvl{font-family:var(--mono);font-size:9.5px;letter-spacing:.15em;text-transform:uppercase;
  color:#A99BFF;font-weight:600;}
.a-toastmsg{font-family:var(--disp);font-size:15.5px;font-weight:500;line-height:1.3;margin-top:2px;}
.a-toastpct{font-family:var(--disp);font-size:26px;font-weight:700;letter-spacing:-.02em;margin-left:auto;}
@media (prefers-reduced-motion:reduce){.a-toast{animation:none;} .a-mfill{transition:none;}}
@media (prefers-reduced-motion:reduce){.a-root *{transition:none!important;animation:none!important;}}
`;

/* ------------------------------------------------------------------ *
 *  Component
 * ------------------------------------------------------------------ */
export default function AlgoLMS() {
  const [st, setSt] = useState(null);
  const [view, setView] = useState("plan");
  const [cur, setCur] = useState("m1");
  const [tab, setTab] = useState("recon");
  const [qi, setQi] = useState(0);
  const [coQuery, setCoQuery] = useState("");
  const [coSel, setCoSel] = useState(null);
  const [triCo, setTriCo] = useState(null);
  const [triDays, setTriDays] = useState(7);
  const [toast, setToast] = useState(null);
  const saveTimer = useRef(null);
  const fileRef = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    let alive = true;
    loadState().then((s) => { if (alive) setSt(s || freshState()); });
    return () => { alive = false; };
  }, []);

  const push = (next) => {
    setSt(next);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveState(next), 350);
  };

  /* progress actions: bump the daily streak, then check for a level-up */
  const progress = (next, watchMod) => {
    const t = today();
    if (next.lastDay !== t) {
      const cont = next.lastDay === yesterday();
      next = { ...next, lastDay: t, streak: cont ? (next.streak || 0) + 1 : 1 };
      next.bestStreak = Math.max(next.bestStreak || 0, next.streak);
    }
    if (watchMod) {
      const before = masteryFor(watchMod, st);
      const after = masteryFor(watchMod, next);
      if (before && after && after.lvl > before.lvl) {
        setToast({ title: watchMod.title, level: after.level.n, pct: after.pct });
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 4200);
      }
    }
    push(next);
  };

  const mod = MODULES.find((m) => m.id === cur) || MODULES[0];

  const currentWeek = useMemo(() => {
    if (!st || !st.start) return 1;
    const days = Math.floor((Date.now() - new Date(st.start + "T00:00:00").getTime()) / 86400000);
    return Math.min(24, Math.max(1, Math.floor(days / 7) + 1));
  }, [st]);

  const solvedCount = useMemo(() => (st ? NAME_BY_IDX.filter((n) => st.solved[n]).length : 0), [st]);
  const touched = useMemo(
    () => (st ? TEACHING.filter((m) => m.anchors.some((n) => st.solved[n])).length : 0),
    [st]
  );
  const quizStats = useMemo(() => {
    if (!st) return { answered: 0, correct: 0 };
    let answered = 0, correct = 0;
    MODULES.forEach((m) => {
      const p = st.picks[m.id] || {};
      m.quiz.forEach((q, i) => { if (p[i] !== undefined) { answered++; if (p[i] === q.a) correct++; } });
    });
    return { answered, correct };
  }, [st]);

  if (!st) {
    return (
      <div className="a-root"><style>{CSS}</style>
        <div className="a-wrap" style={{ paddingTop: 60 }}><p className="a-lab">Loading your progress…</p></div>
      </div>
    );
  }

  /* which pattern does a problem belong to — so a tick can announce a level-up */
  const modOf = (name) => TEACHING.find((m) => m.probs.includes(name));

  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(st, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pattern-ladder-progress-" + today() + ".json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProgress = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const s = JSON.parse(reader.result);
        if (s && s.solved) push({ solved: {}, picks: {}, notes: {}, ...s });
      } catch (err) { /* a bad file leaves current progress untouched */ }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const toggle = (name) => {
    const solved = { ...st.solved };
    const gaining = !solved[name];
    if (solved[name]) delete solved[name]; else solved[name] = true;
    progress({ ...st, solved }, gaining ? modOf(name) : null);
  };
  const pick = (i, choice) => progress(
    { ...st, picks: { ...st.picks, [mod.id]: { ...(st.picks[mod.id] || {}), [i]: choice } } },
    choice === mod.quiz[i].a ? mod : null
  );
  const openMod = (id) => {
    setCur(id); setView("module");
    setTab(MODULES.find((m) => m.id === id).one ? "recon" : "learn");
    setQi(0); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- shared row renderer ---------- */
  const ProblemRow = ({ name, anchor, showTags, forCompany }) => {
    const p = P(name);
    const pi = IDX_BY_NAME[name];
    const on = !!st.solved[name];
    const tags = TAGS[pi];
    const mine = forCompany != null ? tags.find((t) => t.c === forCompany) : null;
    return (
      <div className={"a-prow" + (on ? " on" : "")}>
        <button className={"a-box" + (on ? " on" : "")} onClick={() => toggle(name)}
          aria-label={(on ? "Mark unsolved: " : "Mark solved: ") + name} />
        <span className={"a-diff " + p.diff}>{p.diff === "E" ? "EASY" : p.diff === "M" ? "MED" : "HARD"}</span>
        <span className="a-pname">
          {name}{anchor && <span className="a-star" title="Anchor problem — do this one first">★</span>}
        </span>
        {mine && <span className="a-co sm">{FREQ_LABEL[mine.f]} freq</span>}
        {mine && mine.recent && <span className="a-fresh">LAST 6 MO</span>}
        <span className="a-links">
          <a className="a-link pri" href={p.neet} target="_blank" rel="noopener noreferrer">NeetCode</a>
          {p.leet && <a className="a-link" href={p.leet} target="_blank" rel="noopener noreferrer">LeetCode</a>}
        </span>
        {showTags && tags.length > 0 && (
          <span className="a-tagline">
            {tags.filter((t) => t.f >= 3).slice(0, 5).map((t) => (
              <span key={t.c} className="a-co sm">{CO[t.c]}</span>
            ))}
          </span>
        )}
      </div>
    );
  };

  const modPicks = st.picks[mod.id] || {};
  const modSolved = mod.probs.filter((n) => st.solved[n]).length;
  const idx = TEACHING.findIndex((m) => m.id === mod.id);

  return (
    <div className="a-root">
      <style>{CSS}</style>
      <div className="a-wrap">

        <header className="a-head">
          <p className="a-eyebrow">NeetCode 150 · 21 patterns · three passes</p>
          <h1 className="a-h1">The Pattern Ladder</h1>
          <p className="a-sub">
            Coding interview preparation built on the NeetCode 150, grouped into 21 patterns
            and worked breadth first, then depth. Start from anywhere — the schedule fits six
            months of steady work, and problems are ordered by how often companies actually
            ask them, so a shorter runway means stopping earlier rather than starting
            somewhere different.
          </p>
          <div className="a-meters">
            <div className="a-meter hi">
              <b>{touched}<i>/21</i></b>
              <span>Patterns seen</span>
            </div>
            <div className="a-meter"><b>{totalXP(st)}</b><span>Mastery points</span></div>
            <div className="a-meter"><b>{solvedCount}<i>/150</i></b><span>Problems solved</span></div>
            <div className="a-meter">
              <b>{st.streak || 0}<i> day{(st.streak || 0) === 1 ? "" : "s"}</i></b>
              <span>Streak · best {st.bestStreak || 0}</span>
            </div>
            <div className="a-meter"><b>{currentWeek}<i>/24</i></b><span>Week</span></div>
            <div className="a-meter">
              <b>{quizStats.answered ? Math.round((quizStats.correct / quizStats.answered) * 100) + "%" : "—"}</b>
              <span>Quiz accuracy</span>
            </div>
          </div>
        </header>

        <section className="a-lat-box">
          <div className="a-lat-top">
            <span className="a-lat-title">Coverage lattice — patterns in company-yield order, highest first</span>
            <span className="a-lat-title">{touched} of 21 patterns opened</span>
          </div>
          <div className="a-lat">
            {TEACHING.map((m) => {
              const anyAnchor = m.anchors.some((n) => st.solved[n]);
              return (
                <div key={m.id} className={"a-lat-grp" + (anyAnchor ? " touched" : "")}
                  onClick={() => openMod(m.id)} title={m.title}>
                  <div className="a-lat-cells">
                    {m.probs.map((n) => (
                      <span key={n} title={n}
                        className={"a-cell d" + P(n).diff + (st.solved[n] ? " s" : "") +
                          (m.anchors.includes(n) ? " anc" : "")} />
                    ))}
                  </div>
                  <span className="a-lat-lab">{m.tag.split(" ")[0]}</span>
                </div>
              );
            })}
          </div>
          <div className="a-legend">
            <span className="a-lg"><i style={{ background: "var(--violet)" }} /> solved</span>
            <span className="a-lg"><i style={{ background: "var(--amber-t)" }} /> anchor, not yet done</span>
            <span className="a-lg"><i style={{ borderBottom: "2px solid var(--green)" }} /> easy</span>
            <span className="a-lg"><i style={{ borderBottom: "2px solid var(--amber)" }} /> medium</span>
            <span className="a-lg"><i style={{ borderBottom: "2px solid var(--rose)" }} /> hard</span>
          </div>
        </section>

        <nav className="a-nav">
          {[["plan", "Plan"], ["module", "Patterns"], ["company", "Companies"], ["triage", "Interview triage"]].map(
            ([k, label]) => (
              <button key={k} className={"a-navtab" + (view === k ? " on" : "")} onClick={() => setView(k)}>
                {label}
              </button>
            )
          )}
        </nav>

        {/* ======================= PLAN ======================= */}
        {view === "plan" && (
          <>
            <section className="a-card">
              <div className="a-mtop" style={{ marginBottom: 14 }}>
                <span className="a-lab" style={{ margin: 0 }}>Mastery board — every pattern, current level</span>
                <span className="a-mpct">{totalXP(st)} points earned</span>
              </div>
              <div className="a-board">
                {TEACHING.map((m) => {
                  const ms = masteryFor(m, st);
                  return (
                    <button key={m.id} className="a-tile" onClick={() => openMod(m.id)}>
                      <div className="a-tilename">{m.title}</div>
                      <div className="a-tilemeta">
                        <span className="a-lvlpill" style={{ color: ms.level.c, background: "var(--paper)" }}>{ms.level.n}</span>
                        <span className="a-mpct">{ms.pct}%</span>
                      </div>
                      <div className="a-mtrack">
                        <div className="a-mfill" style={{ width: ms.pct + "%", background: ms.level.c }} />
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="a-note">
                Levels move on every problem, every correct quiz answer, and every set of notes you
                write in your own words. Hard problems are worth more. Nothing decays, so a bad week
                costs you nothing but time.
              </p>
              <div className="a-seg" style={{ marginTop: 14 }}>
                <button className="a-btn ghost" onClick={exportProgress}>Export progress</button>
                <button className="a-btn ghost" onClick={() => fileRef.current && fileRef.current.click()}>Import progress</button>
                <button className="a-btn ghost" onClick={() => push({ ...st, start: today() })}>Start clock today</button>
              </div>
              <input ref={fileRef} type="file" accept="application/json" style={{ display: "none" }}
                onChange={importProgress} />
            </section>
            {PLAN.map((ps) => {
              const active = ps.rows.some((r) => r.week === currentWeek);
              return (
                <section key={ps.pass} className="a-pass">
                  <div className={"a-passhead" + (active ? " now" : "")}>
                    <span className="a-passno">Pass {ps.pass} · {ps.weeks} · {ps.short}</span>
                    <h2 className="a-passname">{ps.name}</h2>
                    <p className="a-passblurb">{ps.blurb}</p>
                  </div>
                  {ps.rows.map((r) => (
                    <div key={r.week} className={"a-wkrow" + (r.week === currentWeek ? " now" : "")}>
                      <span className="a-wkno">Week {r.week}</span>
                      <span className="a-wklab">{r.label}</span>
                      <span className="a-wkmods">
                        {r.mods.map((id) => {
                          const m = MODULES.find((x) => x.id === id);
                          const done = ps.pass === 1
                            ? m.anchors && m.anchors.every((n) => st.solved[n])
                            : m.probs.length > 0 && m.probs.every((n) => st.solved[n]);
                          return (
                            <button key={id} className={"a-mchip" + (done ? " done" : "")}
                              onClick={() => openMod(id)}>{m.title}</button>
                          );
                        })}
                      </span>
                    </div>
                  ))}
                </section>
              );
            })}
            <p className="a-note" style={{ maxWidth: "72ch" }}>
              If a recruiter calls tomorrow, do not try to accelerate this plan — open Interview
              triage instead. It builds a list sized to the days you actually have.
            </p>
          </>
        )}

        {/* ======================= MODULE ======================= */}
        {view === "module" && (
          <div className="a-grid">
            <nav className="a-rail" aria-label="Patterns">
              <div className="a-phase">Patterns · by company yield</div>
              {TEACHING.map((m, i) => {
                const ms = masteryFor(m, st);
                return (
                  <button key={m.id} className={"a-navbtn" + (m.id === cur ? " on" : "")} onClick={() => openMod(m.id)}
                    title={ms.level.n + " · " + ms.pct + "%"}>
                    <span className="a-rank">{i + 1}</span>
                    <span>{m.title}</span>
                    <span className="a-railbar">
                      <span className="a-railfill" style={{ width: ms.pct + "%", background: ms.level.c }} />
                    </span>
                  </button>
                );
              })}
              <div className="a-phase">Checkpoints</div>
              {CHECKPOINTS.map((m) => (
                <button key={m.id} className={"a-navbtn" + (m.id === cur ? " on" : "")} onClick={() => openMod(m.id)}>
                  <span className="a-rank">·</span><span>{m.title}</span>
                </button>
              ))}
              <div style={{ padding: "14px 9px 8px", borderTop: "1px solid var(--rule2)", marginTop: 6 }}>
                <button className="a-btn ghost" style={{ width: "100%" }}
                  onClick={() => push({ ...st, start: new Date().toISOString().slice(0, 10) })}>
                  Start clock today
                </button>
              </div>
            </nav>

            <main className="a-panel">
              <div className="a-ptop">
                <div className="a-crumb">
                  <span className="a-chip">{mod.tag}</span>
                  {mod.probs.length > 0 && <span>{modSolved}/{mod.probs.length} solved</span>}
                </div>
                <h2 className="a-h2">{mod.title}</h2>
                {mod.probs.length > 0 && (() => {
                  const ms = masteryFor(mod, st);
                  return (
                    <div className="a-mbox">
                      <div className="a-mtop">
                        <span className="a-mname" style={{ color: ms.level.c }}>{ms.level.n}</span>
                        <span className="a-mpct">{ms.pts} / {ms.max} pts · {ms.pct}%</span>
                      </div>
                      <div className="a-mtrack">
                        <div className="a-mfill" style={{ width: ms.pct + "%", background: ms.level.c }} />
                      </div>
                      <p className="a-mnext">
                        {ms.next
                          ? <>Another <b>{ms.toNext} points</b> reaches {ms.next.n}. A medium is worth {PTS.M}, a hard {PTS.H}, each right quiz answer {QUIZ_PTS}, and writing your own notes {NOTE_PTS}.</>
                          : <>Top level reached. Defend it: re-solve two of these from memory next week.</>}
                      </p>
                    </div>
                  );
                })()}
                {mod.probs.length > 0 && (
                  <div className="a-cos">
                    <span className="a-colab">Asked most at</span>
                    {topCompaniesForModule(mod, 6).map((c) => <span key={c} className="a-co">{c}</span>)}
                  </div>
                )}
                <div className="a-tabs">
                  {mod.one && <button className={"a-tab" + (tab === "recon" ? " on" : "")} onClick={() => setTab("recon")}>Recon</button>}
                  <button className={"a-tab" + (tab === "learn" ? " on" : "")} onClick={() => setTab("learn")}>Deep dive</button>
                  {mod.quiz.length > 0 && (
                    <button className={"a-tab" + (tab === "quiz" ? " on" : "")} onClick={() => { setTab("quiz"); setQi(0); }}>
                      Quiz · {Object.keys(modPicks).length}/{mod.quiz.length}
                    </button>
                  )}
                  {mod.probs.length > 0 && (
                    <button className={"a-tab" + (tab === "practice" ? " on" : "")} onClick={() => setTab("practice")}>
                      Practice · {modSolved}/{mod.probs.length}
                    </button>
                  )}
                  <button className={"a-tab" + (tab === "notes" ? " on" : "")} onClick={() => setTab("notes")}>Notes</button>
                </div>
              </div>

              <div className="a-body">
                {tab === "recon" && mod.one && (
                  <>
                    <p className="a-lab">If you remember one thing</p>
                    <p className="a-one">{mod.one}</p>
                    <p className="a-lab">Reach for it when you see</p>
                    <ul className="a-ul">{mod.lesson.triggers.slice(0, 4).map((t, i) => <li key={i}>{t}</li>)}</ul>
                    {mod.lesson.code && (
                      <>
                        <p className="a-codetitle">{mod.lesson.code.title}</p>
                        <div className="a-code"><pre>{mod.lesson.code.body}</pre></div>
                        <div style={{ height: 20 }} />
                      </>
                    )}
                    <p className="a-lab">Anchor problems — these two, then move on</p>
                    {mod.anchors.map((n) => <ProblemRow key={n} name={n} anchor showTags />)}
                    <p className="a-note">
                      That is the whole recon pass for this pattern. Resist finishing the section
                      now: breadth beats depth while you still have blind spots.
                    </p>
                    <div className="a-foot">
                      <button className="a-btn ghost" disabled={idx <= 0} onClick={() => openMod(TEACHING[Math.max(0, idx - 1)].id)}>← Previous pattern</button>
                      <button className="a-btn" disabled={idx < 0 || idx >= TEACHING.length - 1}
                        onClick={() => openMod(TEACHING[Math.min(TEACHING.length - 1, idx + 1)].id)}>Next pattern →</button>
                    </div>
                  </>
                )}

                {tab === "learn" && (
                  <>
                    <p className="a-big">{mod.lesson.big}</p>
                    {mod.lesson.triggers.length > 0 && (
                      <>
                        <p className="a-lab">Reach for this when you see</p>
                        <ul className="a-ul">{mod.lesson.triggers.map((t, i) => <li key={i}>{t}</li>)}</ul>
                      </>
                    )}
                    {mod.lesson.drill && (
                      <>
                        <p className="a-lab">The drill</p>
                        <ul className="a-ul">{mod.lesson.drill.map((t, i) => <li key={i}>{t}</li>)}</ul>
                      </>
                    )}
                    {mod.lesson.code && (
                      <>
                        <p className="a-codetitle">{mod.lesson.code.title}</p>
                        <div className="a-code"><pre>{mod.lesson.code.body}</pre></div>
                        <div style={{ height: 18 }} />
                      </>
                    )}
                    {mod.lesson.cost && <p className="a-cost">{mod.lesson.cost}</p>}
                    <p className="a-lab">Where people lose points</p>
                    <ul className="a-ul warn">{mod.lesson.traps.map((t, i) => <li key={i}>{t}</li>)}</ul>
                    <div className="a-foot">
                      <button className="a-btn ghost" onClick={() => setView("plan")}>← Back to plan</button>
                      {mod.quiz.length > 0 && <button className="a-btn" onClick={() => { setTab("quiz"); setQi(0); }}>Check understanding →</button>}
                    </div>
                  </>
                )}

                {tab === "quiz" && mod.quiz.length > 0 && (() => {
                  const q = mod.quiz[qi];
                  const picked = modPicks[qi];
                  const answered = picked !== undefined;
                  const last = qi === mod.quiz.length - 1;
                  const allDone = mod.quiz.every((_, i) => modPicks[i] !== undefined);
                  const score = mod.quiz.filter((qq, i) => modPicks[i] === qq.a).length;
                  return (
                    <>
                      <div className="a-dots">
                        {mod.quiz.map((qq, i) => (
                          <span key={i} className={"a-dot" + (modPicks[i] === undefined ? "" : modPicks[i] === qq.a ? " done" : " wrong")} />
                        ))}
                      </div>
                      <p className="a-lab">Question {qi + 1} of {mod.quiz.length}</p>
                      <p className="a-q">{q.q}</p>
                      {q.opts.map((o, i) => {
                        let cls = "a-opt";
                        if (answered && i === q.a) cls += " right";
                        else if (answered && i === picked) cls += " wrong";
                        return (
                          <button key={i} className={cls} disabled={answered} onClick={() => pick(qi, i)}>
                            <span className="a-optk">{String.fromCharCode(65 + i)}</span>{o}
                          </button>
                        );
                      })}
                      {answered && (
                        <div className={"a-why" + (picked === q.a ? "" : " no")}>
                          <b>{picked === q.a ? "Correct" : "Not quite"}</b>{q.why}
                        </div>
                      )}
                      <div className="a-foot">
                        <button className="a-btn ghost" disabled={qi === 0} onClick={() => setQi(qi - 1)}>← Back</button>
                        {!last
                          ? <button className="a-btn" disabled={!answered} onClick={() => setQi(qi + 1)}>Next question →</button>
                          : <button className="a-btn" disabled={!answered} onClick={() => setTab("practice")}>Go to practice →</button>}
                      </div>
                      {allDone && (
                        <>
                          <hr className="a-hr" />
                          <p className="a-lab">Module score</p>
                          <p className="a-score">{score}<span style={{ fontSize: 20, color: "var(--ink2)" }}>/{mod.quiz.length}</span></p>
                          <p className="a-note">
                            {score === mod.quiz.length
                              ? "Clean sweep. Go earn it on the problems."
                              : "Re-read the traps for anything you missed, then take it again — the explanation is the lesson."}
                          </p>
                          <div style={{ marginTop: 14 }}>
                            <button className="a-btn ghost" onClick={() => {
                              const picks = { ...st.picks }; delete picks[mod.id];
                              push({ ...st, picks }); setQi(0);
                            }}>Retake quiz</button>
                          </div>
                        </>
                      )}
                    </>
                  );
                })()}

                {tab === "practice" && mod.probs.length > 0 && (
                  <>
                    <p className="a-note" style={{ margin: "0 0 16px" }}>
                      Starred problems are the two anchors from recon. Company chips show who has
                      asked each one recently — a rough signal, not a promise.
                    </p>
                    {mod.probs.map((n) => (
                      <ProblemRow key={n} name={n} anchor={mod.anchors && mod.anchors.includes(n)} showTags />
                    ))}
                    <div className="a-foot">
                      <button className="a-btn ghost" onClick={() => setTab("learn")}>← Back to lesson</button>
                      <button className="a-btn" disabled={idx < 0 || idx >= TEACHING.length - 1}
                        onClick={() => openMod(TEACHING[Math.min(TEACHING.length - 1, idx + 1)].id)}>Next pattern →</button>
                    </div>
                  </>
                )}

                {tab === "notes" && (
                  <>
                    <p className="a-lab">Your notes</p>
                    <p className="a-note" style={{ margin: "0 0 14px" }}>
                      Write the recurrence, the bug you hit, or the sentence you would say out loud
                      in an interview. Rewriting an idea in your own words is what makes it stick.
                    </p>
                    <textarea className="a-ta" value={st.notes[mod.id] || ""}
                      placeholder={"e.g. Invariant: window [l,r] never contains a repeat.\nBug I hit: used if instead of while when shrinking."}
                      onChange={(e) => progress({ ...st, notes: { ...st.notes, [mod.id]: e.target.value } }, mod)} />
                  </>
                )}
              </div>
            </main>
          </div>
        )}

        {/* ======================= COMPANIES ======================= */}
        {view === "company" && (() => {
          const matches = CO.map((n, i) => [n, i]).filter(([n]) =>
            n.toLowerCase().includes(coQuery.trim().toLowerCase()));
          const ci = coSel;
          let ranked = [], probs = [];
          if (ci != null) {
            ranked = TEACHING.map((m) => ({ m, ...companyScoreForModule(ci, m) }))
              .filter((r) => r.hits > 0).sort((a, b) => b.score - a.score);
            probs = CT[ci].map(([pi, code]) => ({ pi, f: code % 10, recent: code >= 10 }))
              .sort((a, b) => b.f - a.f || a.pi - b.pi);
          }
          const max = ranked.length ? ranked[0].score : 1;
          return (
            <>
              <div className="a-card">
                <p className="a-lab">Which company are you interviewing with?</p>
                <input className="a-search" value={coQuery} placeholder="Type a company — Meta, Stripe, Databricks…"
                  onChange={(e) => setCoQuery(e.target.value)} />
                <div className="a-colist">
                  {matches.slice(0, 60).map(([n, i]) => (
                    <button key={n} className={"a-cobtn" + (ci === i ? " on" : "")}
                      onClick={() => setCoSel(ci === i ? null : i)}>{n}</button>
                  ))}
                  {matches.length === 0 && <p className="a-note" style={{ margin: 0 }}>
                    No company by that name in the dataset. It covers 54 of the most commonly
                    asked-about employers; try a shorter fragment of the name.
                  </p>}
                </div>
              </div>

              {ci != null && (
                <>
                  <div className="a-card">
                    <p className="a-lab">{CO[ci]} · patterns to study, most reported first</p>
                    {ranked.map((r) => (
                      <button key={r.m.id} className="a-bar" onClick={() => openMod(r.m.id)}>
                        <span className="a-barname">{r.m.title}</span>
                        <span className="a-bartrack"><span className="a-barfill" style={{ width: Math.round((r.score / max) * 100) + "%" }} /></span>
                        <span className="a-barnum">{r.hits} q</span>
                      </button>
                    ))}
                    <p className="a-note">
                      Bars are the summed reported frequency of that pattern's problems at {CO[ci]};
                      the count is how many of the 150 are tagged there.
                    </p>
                  </div>

                  <div className="a-card">
                    <p className="a-lab">{CO[ci]} · reported problems, highest frequency first</p>
                    {probs.map((p) => (
                      <ProblemRow key={p.pi} name={NAME_BY_IDX[p.pi]} forCompany={ci} />
                    ))}
                  </div>
                </>
              )}

              <p className="a-note" style={{ maxWidth: "74ch" }}>
                Source: LeetCode company tags, July 2026 snapshot, filtered to the NeetCode 150.
                These are self-reported by candidates, so they lag real interviews
                by months and cover only what people chose to post. Use them to prioritise, never as
                a list to memorise.
              </p>
            </>
          );
        })()}

        {/* ======================= TRIAGE ======================= */}
        {view === "triage" && (() => {
          const n = triDays <= 2 ? 10 : triDays <= 7 ? 22 : 38;
          const scored = NAME_BY_IDX.map((name, pi) => {
            const hit = triCo != null ? TAGS[pi].find((t) => t.c === triCo) : null;
            const score = triCo != null ? (hit ? hit.f * 10 + (hit.recent ? 5 : 0) : 0) : BREADTH[pi];
            return { name, pi, score };
          }).filter((x) => x.score > 0);
          scored.sort((a, b) => b.score - a.score);
          const unsolved = scored.filter((x) => !st.solved[x.name]).slice(0, n);
          const pats = [];
          unsolved.forEach((x) => {
            const m = TEACHING.find((t) => t.probs.includes(x.name));
            if (m && !pats.includes(m)) pats.push(m);
          });
          return (
            <>
              <div className="a-card">
                <p className="a-lab">How long until the interview?</p>
                <div className="a-seg" style={{ marginBottom: 18 }}>
                  {[[2, "2 days"], [7, "1 week"], [14, "2 weeks"]].map(([d, label]) => (
                    <button key={d} className={"a-btn ghost" + (triDays === d ? " on" : "")} onClick={() => setTriDays(d)}>{label}</button>
                  ))}
                </div>
                <p className="a-lab">Aiming at</p>
                <div className="a-seg">
                  <button className={"a-btn ghost" + (triCo == null ? " on" : "")} onClick={() => setTriCo(null)}>Any big tech</button>
                  {["Google", "Meta", "Amazon", "Microsoft", "Apple", "Bloomberg", "Uber", "TikTok"].map((c) => {
                    const i = CO.indexOf(c);
                    return i < 0 ? null : (
                      <button key={c} className={"a-btn ghost" + (triCo === i ? " on" : "")} onClick={() => setTriCo(i)}>{c}</button>
                    );
                  })}
                </div>
                <p className="a-note">
                  Pick any other company in the Companies view — this shortcut list is just the
                  most common ones.
                </p>
              </div>

              <div className="a-card">
                <p className="a-lab">First, read these {pats.length} sentences out loud</p>
                <ul className="a-ul">
                  {pats.slice(0, 8).map((m) => (
                    <li key={m.id}><b>{m.title}.</b> {m.one}</li>
                  ))}
                </ul>
                <p className="a-note" style={{ marginTop: 0 }}>
                  Recognising the pattern is most of the battle under time pressure. Ten minutes here
                  is worth more than an extra problem.
                </p>
              </div>

              <div className="a-card">
                <p className="a-lab">
                  Then work these {unsolved.length}, in this order
                  {triCo != null ? " — " + CO[triCo] + "'s highest-frequency unsolved problems" : " — broadest coverage across big tech"}
                </p>
                {unsolved.map((x) => (
                  <ProblemRow key={x.name} name={x.name} forCompany={triCo != null ? triCo : undefined} />
                ))}
                {unsolved.length === 0 && (
                  <p className="a-note" style={{ margin: 0 }}>
                    Everything on this list is already ticked. Go re-solve your three weakest from
                    memory with a timer instead, then book a mock.
                  </p>
                )}
              </div>

              <p className="a-note" style={{ maxWidth: "74ch" }}>
                {triDays <= 2
                  ? "Two days is a recognition exercise, not a learning one. Skim, do the easy end, sleep properly, and lean on talking your way through the parts you have not drilled."
                  : triDays <= 7
                    ? "A week is enough to convert recognition into fluency on one or two patterns. Pick the top two and go deep rather than spreading thin."
                    : "Two weeks is enough for a real pass: the list above, plus one mock interview every second day."}
              </p>
            </>
          );
        })()}

        <p className="a-note" style={{ maxWidth: "72ch" }}>
          Solved boxes were pre-filled from your NeetCode screenshot and may not be exact —
          correct any that are wrong and it saves automatically.
        </p>
      </div>

      {toast && (
        <div className="a-toast" role="status" aria-live="polite">
          <div>
            <div className="a-toastlvl">Level up · {toast.level}</div>
            <div className="a-toastmsg">{toast.title}</div>
          </div>
          <div className="a-toastpct">{toast.pct}%</div>
        </div>
      )}
    </div>
  );
}
