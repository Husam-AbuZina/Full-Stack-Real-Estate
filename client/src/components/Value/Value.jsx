import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "../../utils/accordion.jsx";
import "./Value.css";

const Value = () => {
  const [expanded, setExpanded] = useState({});

  // Handler to update the expanded state
  const handleAccordionChange = (keys) => {
    // Update the state for all accordion items
    const updatedExpanded = {};
    data.forEach((item, index) => {
      updatedExpanded[index] = keys.includes(index.toString());
    });
    setExpanded(updatedExpanded);
  };

  return (
    <section id="value" className="v-wrapper">
      {/* ... */}
      <Accordion
        className="accordion"
        allowMultipleExpanded={false}
        onChange={handleAccordionChange} // Call the handler when the accordion changes
      >
        {data.map((item, i) => (
          <AccordionItem 
            className={`accordionItem ${expanded[i] ? "expanded" : "collapsed"}`} 
            key={i}
            uuid={i.toString()}
          >
            <AccordionItemHeading>
              <AccordionItemButton className="flexCenter accordionButton">
                <div className="flexCenter icon">{item.icon}</div>
                <span className="primaryText">
                  {item.heading}
                </span>
                <div className="flexCenter icon">
                  <MdOutlineArrowDropDown size={20} />
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p className="secondaryText">{item.detail}</p>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Value;
