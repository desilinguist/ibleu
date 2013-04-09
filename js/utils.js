// List of reserved keywords that are problematic
reserved_words = ['watch', 'constructor'];

// Utility function that modifies words that are in the above reserved word list
function makeSafe(ngram) {
	return ngram in reserved_words ? '#' + ngram + '#' : ngram;
}

function floatingRound(num) {
    return num > 0 ? Math.ceil(num)*100/100 : -Math.ceil(Math.abs(num)*100)/100;
}

// Utility functions for finding all negative and positive numbers
findNegatives = function(x) { return x < 0; };
findPositives = function(x) { return x >= 0; };

// Find the optimal y-axis limits for displaying a set of BLEU score differences
function findSymmetricYAxisLimits(segmentDiffsArray) {
    var negatives = [];
    var positives = [];
    var largestAbsoluteNegativeDiff, largestPositiveDiff, limit;
    for(var i=0; i<segmentDiffsArray.length; i++) {
        negatives.push.apply(negatives, segmentDiffsArray[i].filter(findNegatives));
        positives.push.apply(positives, segmentDiffsArray[i].filter(findPositives));
    }
    jQuery.each(negatives, function(idx, val) { negatives[idx] = Math.abs(val); });
    largestAbsoluteNegativeDiff = Math.max.apply(Math, negatives);
    largestPositiveDiff = Math.max.apply(Math, positives);
    limit = Math.max(largestAbsoluteNegativeDiff, largestPositiveDiff);
    limit = Math.min(limit+0.05, 1.0);
    return limit;
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
keys = function(o) { return [ p for (p in o) ]; };

// Utility function to check whether two hashes are equal
function hashequal(me, other) {
    if (!$(keys(me)).compare(keys(other))) { return false; }
    for (var key in me) {
        if (me[key] != other[key]) {
            return false;
        }
    }
    return true;
}

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
    for (var docid in tstSet.documents) { tstSegNums[docid] = tstSet.documents[docid].length; }
    var refSegNumsArray = [];
    for (var i=0; i<refSets.length; i++) {
        var refSegNums = {};
        var rset = refSets[i];
        for (docid in rset.documents) {
            refSegNums[docid] = rset.documents[docid].length;
        }
        refSegNumsArray.push(refSegNums);
    }
    var cond2 = refSegNumsArray.map(function(rsn) { return hashequal(rsn, tstSegNums); }).reduce(function(b1, b2) { return b1 && b2; });

    return cond1 && cond2;
}

// Validate each test set against the source set
function validateTstAndSrc(tstSet, srcSet) {

    // setid for the srcset is the same as the tstset?
    var tstSetId = tstSet.setid;
	var srcSetId = srcSet.setid;
	var cond1 = tstSetId == srcSetId;

    // document ids are the same in the test set as well as the srcset?
    // AND
    // number of segments are the same in each document in both sets?
    var tstSegNums = {};
    for (var docid in tstSet.documents) { tstSegNums[docid] = tstSet.documents[docid].length; }
    var srcSegNums = {};
    for (var docid in srcSet.documents) { srcSegNums[docid] = srcSet.documents[docid].length; }
	var cond2 = hashequal(srcSegNums, tstSegNums);

    return cond1 && cond2;
}

// Validate one test set against the second one
function validateTstAndOtherTst(tstSet1, tstSet2) {

    // setid for each tstset is the same?
    var tstSetId1 = tstSet1.setid;
    var tstSetId2 = tstSet2.setid;
	var cond1 = tstSetId1 == tstSetId2;

	// however, the sysid for both tstsets should NOT be the same
	var tstSetSysId1 = tstSet1.sysid;
	var tstSetSysId2 = tstSet2.sysid;
	var cond2 = tstSetSysId1 != tstSetSysId2;

    // document ids are the same in both test sets?
    // AND
    // number of segments are the same in each document in both sets?
    var tstSegNums1 = {};
    for (var docid in tstSet1.documents) { tstSegNums1[docid] = tstSet1.documents[docid].length; }
    var tstSegNums2 = {};
    for (var docid in tstSet2.documents) { tstSegNums2[docid] = tstSet2.documents[docid].length; }
	var cond3 = hashequal(tstSegNums1, tstSegNums2);

    return cond1 && cond2 && cond3;
}


