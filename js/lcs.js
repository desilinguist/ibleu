// This file implements the Hirschberg algorithm for computing the longest common
// subsequence (LCS) between two strings.
// Adapted from http://wordaligned.org/articles/longest-common-subsequence
// Nitin Madnani, July 2011

// A Cell data structure for convenience
function Cell(l, m) {
    this.len = l;
    this.move = m;
}

/*
    Create a grid for longest common subsequence calculations.

    Returns a grid where grid[(j, i)] is a pair (n, move) such that
    - n is the length of the LCS of prefixes xs[:i], ys[:j]
    - move is \, ^, <, or e, depending on whether the best move
      to (j, i) was diagonal, downwards, or rightwards, or None.

    Example:
       T  A  R  O  T
    A 0< 1\ 1< 1< 1<
    R 0< 1^ 2\ 2< 2<
    T 1\ 1< 2^ 2< 3\
*/

function lcs_grid(xs, ys) {

    // Initialize the grid
    var grid = new Array(ys.length+1);
    for (var j=0; j < ys.length+1; j++) {
        grid[j] = new Array(xs.length+1);
        for (var i=0; i < xs.length+1; i++) {
            grid[j][i] = new Cell(0, 'e');
        }
    }

    // Fill the grid
    var cell, left, over, k;
    var s = [];
    for (var j=1; j <= ys.length; j++) {
        for (var i=1; i <= xs.length; i++) {
            if (xs[i-1] == ys[j-1]) {
                k = grid[j-1][i-1].len + 1;
                cell = new Cell(k, '\\')
            }
            else {
                left = grid[j][i-1].len;
                over = grid[j-1][i].len;
                if (left < over) {
                    cell = new Cell(over, '^');
                }
                else {
                    cell = new Cell(left, '<');
                }
            }
            grid[j][i] = cell;
        }
    }
    return grid;
}


// Return a longest common subsequence of xs, ys with indices for both xs and ys
function lcs(xs, ys) {

    //Create the LCS grid first
    var grid = lcs_grid(xs, ys);

    // Create an object that will hold the LCS information
    var lcslist = {};
    lcslist.xindices = [];
    lcslist.yindices = [];
    // lcslist.words = new Array();

    // Walk back from the bottom right corner of the grid
    // and store information into the LCS object
    var i = xs.length;
    var j = ys.length;
    var move, tuple;
    var s = [];
    while (true) {
        move = grid[j][i].move;
        if (move == '\\') {
            // lcslist.words.push(xs[i-1]);
            lcslist.xindices.push(i-1);
            lcslist.yindices.push(j-1);
            // tuple = [xs[i-1], i-1, j-1]
            // lcslist.push(tuple)
            i -= 1;
            j -= 1;
        }
        else if (move == '^') {
            j -= 1;
        }
        else if (move == '<') {
            i -= 1;
        }
        else {
            break;
        }
    }

    // Reverse the component lists of the LCS object
    // lcslist.words.reverse();
    lcslist.xindices.reverse();
    lcslist.yindices.reverse();

    // Return the LCS object
    return lcslist;
}

