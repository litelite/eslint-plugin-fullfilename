"use-strict";

module.exports = function(context){
  const rules = context.options[0].map((r) => ({
    regexp: new RegExp(r.regexp),
    message: r.message,
    failOnMatch: r.failOnMatch,
  }))

  return {
    Program: function(node){
      const filename = context.getFilename().replace(/\\/g, "/");
      const matchedRule = rules.find((r) => r.regexp.test(filename));

      if(!matchedRule || matchedRule.failOnMatch){
          const message = (matchedRule ? matchedRule.message : null)
              || "File name does not match the file naming convention";
          context.report(node, message, {
            name: filename,
          })
      }
    }
  }
};
