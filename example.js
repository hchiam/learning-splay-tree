function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

Node.prototype.add = function (value) {
  // assumes valid value
  if (!this.value) {
    this.value = value;
    return;
  }
  if (value < this.value) {
    if (this.left) {
      this.left.add(value);
    } else {
      this.left = new Node(value);
    }
  } else {
    // if value >= this.value:
    if (this.right) {
      this.right.add(value);
    } else {
      this.right = new Node(value);
    }
  }
};

function SplayBST() {
  this.root = null;
}

SplayBST.prototype.add = function (value) {
  // assumes valid value
  if (!this.root) {
    this.root = new Node(value);
    return;
  }
  if (value < this.root.value) {
    if (this.root.left) {
      this.root.left.add(value);
    } else {
      this.root.left = new Node(value);
    }
  } else {
    // if value >= this.root.value:
    if (this.root.right) {
      this.root.right.add(value);
    } else {
      this.root.right = new Node(value);
    }
  }
  this.splay(value);
};

/**
 * modified version of this:
 * https://github.com/slmoore/js-splay-tree/blob/master/splay-tree-clean.js#L177
 */
SplayBST.prototype.splay = function (value) {
  // returns new root
  // assumes valid value
  var splayRecursive = function (node, value) {
    if (node === null) return null; // done

    if (value < node.value) {
      // look left:
      if (node.left === null) return node; // done

      if (value < node.left.value) {
        // will need to (?) + zig zig:
        node.left.left = splayRecursive(node.left.left, value);
        node = this.rotateRight(node);
      } else if (value > node.left.value) {
        // will need to (?) + zag zig:
        node.left.right = splayRecursive(node.left.right, value);
        if (node.left.right !== null) node.left = this.rotateLeft(node.left);
      }

      if (node.left === null) {
        return node; // done
      } else {
        return this.rotateRight(node); // zig
      }
    } else if (value > node.value) {
      // look right:
      if (node.right === null) return node; // done

      if (value > node.right.value) {
        // will need to (?) + zag zag:
        node.right.right = splayRecursive(node.right.right, value);
        node = this.rotateLeft(node);
      } else if (value < node.right.value) {
        // will need to (?) + zig zag:
        node.right.left = splayRecursive(node.right.left, value);
        if (node.right.left !== null) node.right = this.rotateRight(node.right);
      }

      if (node.right === null) {
        return node; // done
      } else {
        return this.rotateLeft(node); // zag
      }
    } else {
      // if value === node.value
      return node; // done
    }
  }.bind(this);

  this.root = splayRecursive(this.root, value);
  return this.root;
};

SplayBST.prototype.rotateRight = function (node) {
  // mnemonic for right rotation: left, child, rotate
  /**
   *    L            |     C      new
   *    |            |              \
   *    |  old       |    old       old
   *    V /          V     /         /
   *   new          new   /         /
   *      \              /         /
   *      new.R        new.R     new.R
   */
  var newRoot;
  if (node) {
    newRoot = node.left;
    // move child around:
    node.left = newRoot.right;
    // actually do the rotation:
    newRoot.right = node;
  }
  return newRoot;
};

SplayBST.prototype.rotateLeft = function (node) {
  // mnemonic for left rotation: right, child, rotate
  /**
   *          R     C       |      new
   *          |             |      /
   *     old  |    old      |    old
   *        \ V      \      V      \
   *         new      \    new      \
   *        /          \             \
   *     new.L         new.L         new.L
   */
  var newRoot;
  if (node) {
    newRoot = node.right;
    // move child around:
    node.right = newRoot.left;
    // actually do the rotation:
    newRoot.left = node;
  }
  return newRoot;
};

var splayTree = new SplayBST();
splayTree.add(5);
prettyPrintTree(splayTree.root);
splayTree.add(1);
prettyPrintTree(splayTree.root);
splayTree.add(4);
prettyPrintTree(splayTree.root);
splayTree.add(2);
prettyPrintTree(splayTree.root);
splayTree.add(3);
// console.log(JSON.stringify(splayTree) + "\n\n");
prettyPrintTree(splayTree.root);

function prettyPrintTree(node) {
  prettyPrintTree_recursive(node, 0);
  console.log(); // new line after tree
  function prettyPrintTree_recursive(node, level = 0) {
    if (!node || !node.value) return;
    console.log(" ".repeat(level) + node.value);
    if (node.left) {
      prettyPrintTree_recursive(node.left, level + 1);
    }
    if (node.right) {
      prettyPrintTree_recursive(node.right, level + 1);
    }
  }
}
