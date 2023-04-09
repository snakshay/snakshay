import { uiPages } from "./Navbar";
const SectionHeader = ({name}) => {
    return (
            <h3 className="section-header"> {uiPages[name]} </h3>
    );
}
 
export default SectionHeader;