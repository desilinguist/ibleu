// List of reserved keywords that are problematic
reserved_words = ['watch', 'constructor'];

// Utility function that modifies words that are in the above reserved word list
function makeSafe(ngram) { 
	return ngram in reserved_words ? '#' + ngram + '#' : ngram;
}


// Utility funtion to compare whether two arrays are equal
jQuery.fn.compare = function(other) {
    if (this.length != other.length) { return false; }
    var a = this.sort(),
        b = other.sort();
    for (var i = 0; other[i]; i++) {
        if (a[i] !== b[i]) { 
            return false;
        }
    }
    return true;
};

// Utility function to get all keys for a hash
keys = function(o) { return [p for (p in o)]; }

// Utility function to check whether two hashes are equal
function hashequal(me, other) { 
    if (!$(keys(me)).compare(keys(other))) { return false; }
    for (key in me) {
        if (me[key] != other[key]) { 
            return false;
        }
    }
    return true;
};

// Validate each test set against all reference sets
function validateTstAndRefs(tstSet, refSets) {

    // setid for each refset is the same as the tstset?
    var tstSetId = tstSet.setid;
    var refSetIDs = refSets.map(function(rset) { return rset.setid; });
    var cond1 = refSetIDs.every(function(id) { return id == tstSetId; });

    // document ids are the same in the test set as well as the refsets?
    // AND
    // number of segments are the same in each document in all the sets?
    var tstSegNums = {};
    for (docid in tstSet.documents) { tstSegNums[docid] = tstSet.documents[docid].length; }
    var refSegNumsArray = [];
    for (var i=0; i<refSets.length; i++) { 
        var refSegNums = {};
        var rset = refSets[i];
        for (docid in rset.documents) { 
            refSegNums[docid] = rset.documents[docid].length;
        }
        refSegNumsArray.push(refSegNums);
    }
    var cond2 = refSegNumsArray.map(function(rsn) { return hashequal(rsn, tstSegNums); }).reduce(function(b1, b2) { return b1 && b2; })

    return cond1 && cond2;
}

// Validate each test set against the source set
function validateTstAndSrc(srcSet, tstSet) {

    // setid for each refset is the same as the tstset?
    var tstSetId = tstSet.setid;
	var srcSetId = srcSet.setid;
	var cond1 = tstSetId == srcSetId;

    // document ids are the same in the test set as well as the srcset?
    // AND
    // number of segments are the same in each document in both sets?
    var tstSegNums = {};
    for (docid in tstSet.documents) { tstSegNums[docid] = tstSet.documents[docid].length; }
    var srcSegNums = {};
    for (docid in srcSet.documents) { srcSegNums[docid] = srcSet.documents[docid].length; }
	var cond2 = hashequal(srcSegNums, tstSegNums);
 
    return cond1 && cond2;
}


