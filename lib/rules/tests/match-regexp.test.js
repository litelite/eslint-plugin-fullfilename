const matchRegexp = require('../match-regexp');

describe('match-regexp', ()=>{
  const createContext = (rules, fileName, customizations) =>{
    const context = {
      options: [rules],
      getFilename: () => fileName,
      report: () => {},
      ...customizations
    }

    return context;
  }

  const run = (context, node = {}) => {
    const program = matchRegexp(context).Program;
    program(node);
  }

  it('should not report an error when a regexp match', () => {
    // Arrange
    const rule = {
      regexp: ".*",
    };
    const fileName = "some-file-name.js";
    const report = jest.fn();
    const context = createContext([rule], fileName, { report });

    //Act
    run(context);

    //Assert
    expect(report).toHaveBeenCalledTimes(0);
  });

  it('should normalize any "\\" to "/"', () => {
    // Arrange
    const rule = {
      regexp: "^[^\\\\]+$",
    };
    const fileName = "some\\file\\name.js";
    const report = jest.fn();
    const context = createContext([rule], fileName, { report });

    //Act
    run(context);

    //Assert
    expect(report).toHaveBeenCalledTimes(0);
  });

  it('should fail when it matches a failOnMatch rule', ()=>{
    // Arrange
     const rule = {
      regexp: ".*",
      failOnMatch: true,
    };
    const fileName = "some-file-name.js";
    const report = jest.fn();
    const context = createContext([rule], fileName, { report });
    const node = {some: 'node'};

    //Act
    run(context, node);

    //Assert
    expect(report).toHaveBeenCalledTimes(1);
    expect(report).toHaveBeenCalledWith(node,
      "File name does not match the file naming convention",
      {name: fileName});
  });

  it('should take the custom message when a failOnMatch fails', ()=>{
    // Arrange
    const message = 'some message';
    const rule = {
      regexp: ".*",
      failOnMatch: true,
      message
    };
    const fileName = "some-file-name.js";
    const report = jest.fn();
    const context = createContext([rule], fileName, { report });
    const node = {some: 'node'};

    //Act
    run(context, node);

    //Assert
    expect(report).toHaveBeenCalledTimes(1);
    expect(report).toHaveBeenCalledWith(node,
      message,
      {name: fileName});
  });

  it('should not process rules once it gets a match', ()=>{
     // Arrange
     const rules = [{
       regexp: ".*",
     },{
       regexp: ".*",
       failOnMatch: true,
     }];
     const fileName = "some-file-name.js";
     const report = jest.fn();
     const context = createContext(rules, fileName, { report });
     const node = {some: 'node'};

     //Act
     run(context, node);

     //Assert
     expect(report).toHaveBeenCalledTimes(0);
  });

  it('should fail when there is no match', ()=>{
    // Arrange
     const rule = {
      regexp: "^some regex[p]?",
    };
    const fileName = "some-file-name.js";
    const report = jest.fn();
    const context = createContext([rule], fileName, { report });
     const node = {some: 'node'};

    //Act
    run(context, node);

    //Assert
    expect(report).toHaveBeenCalledWith(node,
      "File name does not match the file naming convention",
      {name: fileName});
  });
});
