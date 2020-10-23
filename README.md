# Learning splay tree

Just one of the things I'm learning. <https://github.com/hchiam/learning>

Basically a normal Binary Search Tree, but with self-balancing, but much simpler than previous self-balancing tree algorithms. Just move the node you recently accessed/added to the root, so it's faster to find next time. Amortized, this will make the performance the same on average as other self-balancing trees, without storing any overhead data.

<https://en.wikipedia.org/wiki/Splay_tree> -> There are some disadvantages though that come with constantly moving the last-read node to the root. Make sure your read accesses will be skewed/non-uniform (which is typically the case in practical uses).

<https://www.cs.usfca.edu/~galles/visualization/SplayTree.html>

<https://github.com/slmoore/js-splay-tree/blob/master/splay-tree-clean.js>

```bash
node example.js
```
