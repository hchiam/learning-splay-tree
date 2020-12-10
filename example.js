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
SplayBST.prototype.splay = function (newValue) {
  // returns new root after having rotated the tree to move the newly-added value to root
  // assumes valid value
  var splayRecursive = function (node, newValue) {
    if (node === null) return null; // done

    if (newValue < node.value) {
      // (new value is located at left of root)
      // look left:
      if (node.left === null) return node; // done

      if (newValue < node.left.value) {
        // will need to (?) + zig:
        // (i.e., recursively move newValue to left left node, then rotate right to be at ROOT's left)
        node.left.left = splayRecursive(node.left.left, newValue);
        node = this.rotateRight(node);
      } else if (newValue > node.left.value) {
        // will need to (?) + zag:
        // (i.e., recursively move newValue to left right node, then rotate left to be at ROOT's left)
        node.left.right = splayRecursive(node.left.right, newValue);
        if (node.left.right !== null) node.left = this.rotateLeft(node.left);
      }

      if (node.left === null) {
        return node; // done
      } else {
        return this.rotateRight(node); // + zig (i.e. after the previous steps, now rotate right to make root's left become ROOT)
      }
    } else if (newValue > node.value) {
      // (otherwise if new value is located at right of root)
      // look right:
      if (node.right === null) return node; // done

      if (newValue > node.right.value) {
        // will need to (?) + zag zag:
        // (i.e., recursively move newValue to right right node, then rotate left to be at ROOT's right)
        node.right.right = splayRecursive(node.right.right, newValue);
        node = this.rotateLeft(node);
      } else if (newValue < node.right.value) {
        // will need to (?) + zig zag:
        // (i.e., recursively move newValue to right left node, then rotate right to be at ROOT's right)
        node.right.left = splayRecursive(node.right.left, newValue);
        if (node.right.left !== null) node.right = this.rotateRight(node.right);
      }

      if (node.right === null) {
        return node; // done
      } else {
        return this.rotateLeft(node); // + zag (i.e. after the previous steps, now rotate left to make root's right become ROOT)
      }
    } else {
      // otherwise if the value is already at the ROOT
      // if new value === node.value
      return node; // done
    }
  }.bind(this); // make this mean the ROOT splay tree

  this.root = splayRecursive(this.root, newValue);
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
