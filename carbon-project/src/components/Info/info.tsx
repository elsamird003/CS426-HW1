import "../Info/info.css"; // optional external styles
import forestImg from "./images/pexels-jplenio-1632790.jpg"; 
import treetwo   from "./images/360_F_623513339_6aCi0QCatsTlrPiRibFxCTMusumNiCf0.jpg";
const ForestInfo = () => {
  return (
    <div className="forest-info">
      <img src={forestImg} alt="Old Growth Forest" className="forest-image" />
      <div className="forest-text">
        <h2>🌳 Why Trees Matter</h2>
        <p>
          Forests are carbon sinks that help slow climate change by removing carbon from the atmosphere and storing it in trunks and soil. Old-growth trees — trees that have reached old age without major human disturbances like logging — hold much larger amounts of carbon and harmful pollutants than their younger counterparts.
        </p>
        <p>
          Today, trees absorb 30% of global emissions every year. When we burn them or cut them down, all of that pollution gets released into the air. A recent study estimated that from 2010 to 2050, global forest loss will result in 3.5 to 4.2 billion metric tons of greenhouse gases entering the atmosphere each year.
        </p>
        <p>
          Even small amounts of air pollution contribute to a plethora of health issues that affect society unevenly.
        </p>
      </div>
      <div className="2cond-tree-info">
      <img src={treetwo} alt="Old Growth Forest" className="tree-two" />
        <div className="2cond-tree-text">
        <h3>🌱 Did You Know?</h3>
          <p>
            Trees protect communities against flash floods and landslides by stabilizing soil and absorbing water — between 1,500 and 2,000 liters of water per year. On the other root, a lack of trees can lead to increased runoff and floods.
          </p>
          <p>
            Tree roots also filter harmful chemicals and pollutants from storm runoff that ends up in lakes, streams and rivers. Forests provide drinking water to more than 150 million people in the United States, according to the U.S. Forest Service.
          </p>
          <p>
            Or, put simply: more trees = cleaner water.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForestInfo;
