function spinalCase(str) {
    // "It's such a fine line between stupid, and clever."
    // --David St. Hubbins
    return str
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .split(/[ _-]+/g)
        .join('-')
        .toLowerCase();
}
console.log('[result]', spinalCase('This Is Spinal Tap'));
console.log('[result]', spinalCase('thisIsSpinalTap')); // should return "this-is-spinal-tap"
console.log('[result]', spinalCase('The_Andy_Griffith_Show')); // should return "the-andy-griffith-show".
