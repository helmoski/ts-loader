const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const MemoryFS = require("memory-fs");
const { ufs } = require("unionfs");

const config = {
    devtool: 'inline-source-map',
    mode: "development",
    entry: "/src/someplace-somewhere/index.ts",
    output: {
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: path.join(__dirname, "..", "..", "..", "dist")
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    }
};

describe("memory-fs", () => {
    let compiler;
    let inputMemoryFileSystem;

    beforeEach(() => {
        compiler = webpack(config);

        inputMemoryFileSystem = new MemoryFS();
        inputMemoryFileSystem.mkdirpSync("/src/someplace-somewhere");
        inputMemoryFileSystem.writeFileSync("/src/tsconfig.json", fs.readFileSync(path.join(__dirname, "tsconfig.json")));
        inputMemoryFileSystem.writeFileSync("/src/someplace-somewhere/index.ts", fs.readFileSync(path.join(__dirname, "data/index.ts")));
        inputMemoryFileSystem.writeFileSync("/src/someplace-somewhere/render.ts", fs.readFileSync(path.join(__dirname, "data/render.ts")));
        
        // ufs works as a stack, so this actually uses memoryfs first, 
        // then the real fs if we fail to find anything in memoryfs
        const inputFileSystem = ufs
            .use(fs)
            .use(inputMemoryFileSystem)
        
        compiler.inputFileSystem = inputFileSystem;
    });

    it("should compile from a memory-fs for the input file system", (done) => {
        compiler.run((err, stats) => {
            done();

            if (err) {
                return done(err);
            }

            if (stats.hasWarnings()) {
                const statJson = stats.toJson();
                return done(statJson.warings[0]);
            }

            if (stats.hasErrors()) {
                const statJson = stats.toJson();
                return done(statJson.errors[0]);
            }

            const output = stats.toJson().modules[0].source;
            expect(output).toMatchSnapshot();
            done();
        });
    });
});

