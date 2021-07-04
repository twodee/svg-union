const paper = require('paper');
const fs = require('fs');
const svgPath = process.argv[2];

const size = new paper.Size(1000, 1000);
paper.setup(size);

const oldSource = fs.readFileSync(svgPath, 'utf8');
const root = paper.project.importSVG(oldSource, {
  applyMatrix: false,
  insert: false,
  expandShapes: true,
});

const mainGroup = root.children['main-group'];
let path = mainGroup.children[0];
for (let i = 1; i < mainGroup.children.length; ++i) {
  const item = mainGroup.children[i];
  path = path.unite(item, {insert: false});
}
path.applyMatrix = true;
path.scale(30);

paper.project.activeLayer.addChild(path);

const newSource = paper.project.exportSVG({
  bounds: 'content',
  asString: true,
});

fs.writeFileSync('out.svg', newSource, 'utf8');
