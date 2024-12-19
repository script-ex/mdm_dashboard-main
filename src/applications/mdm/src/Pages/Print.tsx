import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactDOMServer from 'react-dom/server';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MDMRootState, mdmStoreDispatch, mdmStoreSelector } from '../Store';
import {useTranslation} from 'react-i18next';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
function parseHTML(htmlString) {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(htmlString, 'text/html');
  const divElement = parsedDocument.querySelector('div');

  return divElement;
}
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
export function Print() {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();

  const state = mdmStoreSelector((state: MDMRootState) => state.report.report);
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
  const [logoImageLoaded, setLogoImageLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (!backgroundImageLoaded || !logoImageLoaded) return;
      console.log(backgroundImageLoaded, logoImageLoaded);
      let contentElement = document.getElementById('content');

      // Get the content height
      const contentHeight = contentElement.offsetHeight;

      // Calculate the required margins
      const sideMargin = 2 * window.devicePixelRatio; // Example margin, adjust as needed

      // Calculate the remaining space on the page
      const remainingHeight = 979;

      // Calculate the number of pages needed
      const numPages = Math.ceil(contentHeight / remainingHeight);
      console.log(contentHeight, remainingHeight, numPages);

      let allTables = document.querySelectorAll('table');
      let i1 = 1;
      // add margin to tables so they don't get cut off
      allTables.forEach((table, i) => {
        const top =
          table.getBoundingClientRect().top -
          contentElement.getBoundingClientRect().top;
        const bottom =
          table.getBoundingClientRect().bottom -
          contentElement.getBoundingClientRect().top;
        let topPage = Math.floor(top / remainingHeight);
        topPage = topPage < 0 ? topPage * -1 : topPage;
        const bottomPage = Math.floor(bottom / remainingHeight);
        console.log(i, top, bottom, topPage, bottomPage);
        if (topPage !== bottomPage) {
          const topRemaining =
            remainingHeight - (top - topPage * remainingHeight);
          console.log(
            'H',
            topRemaining,
            remainingHeight,
            i,
            topPage,
            bottomPage,
            top,
            bottom,
            table
          );
          if (topRemaining < 200) {
            table.style['margin-top'] =
              'calc(' + topRemaining + 'px + 2rem + ' + 38 * i1 + 'mm)';
            console.log();
            i1++;
            console.log(
              'Here',
              topRemaining,
              topPage,
              bottomPage,
              top,
              bottom,
              table
            );
          }
        }
      });
      contentElement = document.getElementById('content');
      let blobs = [];
      // Apply the margins to each page
      const allWrapElem = document.createElement('div');
      allWrapElem.style.position = 'absolute';
      allWrapElem.style.top = '0';
      allWrapElem.style.left = '0';
      for (let i = 0; i < numPages; i++) {
        const pageStart = `calc(297mm * ${i} * -1  + 38mm * ${i})`;

        const wrapperElement = document.createElement('div');
        wrapperElement.id = 'wrapper-elem';
        wrapperElement.style.height = '297mm';
        wrapperElement.style.width = '210mm';
        wrapperElement.style.position = 'relative';
        // wrapperElement.style.border = '3px solid black';
        wrapperElement.style.overflow = 'hidden';
        const pageElement = document.createElement('div');
        wrapperElement.className = 'print-page';

        pageElement.id = 'test-id';
        pageElement.style.marginTop = '18mm';
        pageElement.style.marginBottom = '20mm';
        pageElement.style.height = 'calc(297mm - 38mm)';
        pageElement.style.width = '100%';
        pageElement.style.position = 'relative';
        pageElement.style.left = sideMargin + 'px';
        pageElement.style.overflow = 'hidden';

        const htmlRight = ReactDOMServer.renderToString(
          <div
            className="absolute layer-right"
            style={{
              zIndex: 100000,
              position: 'absolute',
              top: 0,
              right: '0',
              marginRight: '-4rem',
              overflow: 'hidden'
            }}
          >
            <img
              style={{
                width: '140px',
                height: '303mm',
                transform: 'rotate(180deg) scaleX(-1)'
              }}
              alt="background-layer"
              src="/background-layer.png"
            />
          </div>
        );
        const htmlLeft = ReactDOMServer.renderToString(
          <div
            className="absolute layer-left"
            style={{
              zIndex: 100000,
              position: 'absolute',
              top: 0,
              height: '297mm',
              display: 'flex',
              alignItems: 'end',
              left: '0',
              marginLeft: '-4rem'
            }}
          >
            <img
              style={{
                width: '140px',
                transform: 'scaleX(-1)',
                height: '297mm'
              }}
              alt="background-layer"
              src="/background-layer.png"
            />
          </div>
        );

        const header = ReactDOMServer.renderToString(
          <div
            style={{
              position: 'absolute',
              top: '0',
              width: '100%'
            }}
          >
            <div
              className="d-flex justify-content-between"
              style={{
                marginLeft: '75px',
                marginRight: '75px',
                marginTop: '20px'
              }}
            >
              <img
                height={35}
                src="http://localhost:3000/logo.jpg"
                alt="logo"
              />
              <h2
                style={{
                  color: '#F17339',
                  fontWeight: 'bold'
                }}
                className=""
              >
                MY DIVERSITY MANAGER™
              </h2>
            </div>
          </div>
        );

        const footer = ReactDOMServer.renderToString(
          <div
            style={{
              zIndex: 10000,
              position: 'absolute',
              top: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'end',
              height: '297mm',
              width: '100%'
            }}
          >
            <p
              className="mt-auto text-center"
              style={{
                color: 'gray',
                fontSize: '12px'
              }}
            >
              {i + 1}
              <br />
              {t("© 1998-2024 SDMS 360. All rights reserved.")}
              <br />
              {t("SDMS 360 | (404) 594-3399 | info@sdms360.com | www.sdms360.com")}
            </p>
          </div>
        );
        wrapperElement.appendChild(
          parseHTML(i % 2 === 0 ? htmlRight : htmlLeft)
        );
        wrapperElement.appendChild(parseHTML(header));
        wrapperElement.appendChild(parseHTML(footer));
        // Copy the content for each page
        const clonedContent = contentElement.cloneNode(true);
        // clonedContent.style.position = 'absolute';
        // clonedContent.style.top = pageStart;
        pageElement.appendChild(clonedContent);
        wrapperElement.appendChild(pageElement);
        // Append each page to the body
        allWrapElem.appendChild(wrapperElement);
        // blobs.push(
        //     html2pdf().from(wrapperElement).outputPdf('blob')
        // );
      }

      // document.body.appendChild(allWrapElem)

      // Promise.all(blobs).then((values) => {

      //     const blob = new Blob(values, { type: 'application/pdf' });
      //     const downloadLink = document.createElement('a');
      //     downloadLink.href = URL.createObjectURL(blob);
      //     downloadLink.download = 'file1.pdf'; // Specify the desired file name

      //     // Simulate a click on the download link
      //     downloadLink.click();

      //     // Clean up the URL object
      //     URL.revokeObjectURL(downloadLink.href);
      // });

      let box = document.querySelectorAll('#wrapper-elem');
      // Trigger the print dialog
      contentElement.style.display = 'none';
      contentElement.querySelectorAll('table').forEach((elem) => {
        elem.style.display = 'none';
      });

      const content = [{}];
      console.log(content);
      // const docDefinition = {
      //     content: [],
      //     // footer: function(currentPage, pageCount) {
      //     //     return [
      //     //         {
      //     //             stack: [
      //     //                 { text: '1' },
      //     //                 { text: '© 1998-2023 SDMS 360. All rights reserved.'},
      //     //                 { text: 'SDMS 360 | (404) 594-3399 | info@sdms360.com | www.sdms360.com'},
      //     //             ],
      //     //             alignment: 'center',
      //     //             color: 'gray',
      //     //             fontSize: '12px'
      //     //         }
      //     //     ]
      //     // },
      //     header: function(currentPage, pageCount) {
      //         return [
      //             {
      //                 columns: [{
      //                     image: "http://localhost:3000/logo.jpg",
      //                     width: 140,
      //                     height: 35,

      //                 }, {
      //                     text: 'MY DIVERSITY MANAGER™',
      //                     alignment: 'left',
      //                     color: "#F17339",
      //                     fontSize: 20,
      //                     bold: true,
      //                 }],
      //                 margin: [75, 20, 75, 0]
      //             }
      //         ];
      //       },
      //     pageSize: 'A4',

      //     pageOrientation: 'portrait',
      // }
      // const backgroundResponse = await fetch("/background-layer.png")
      // const backgroundBlob = await backgroundResponse.blob();

      // const logoResponse = await fetch("http://localhost:3000/logo.jpg")
      // const logoBlob = await logoResponse.blob();

      // pdfMake.createPdf({
      //     images: {
      //         'http://localhost:3000/logo.jpg': await blobToDataURL(logoBlob),
      //         '/background-layer.png': await blobToDataURL(backgroundBlob)

      //     },
      //     ...docDefinition
      // }).download('optionalName.pdf');

      var doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        left: 20,
        right: 20,
        top: 30,
        bottom: 30
      } as any);

      // for (let i = 0; i < box.length; i++) {
      //     const elem = box[i];
      //     if (i < 2) {
      //         continue;
      //         doc.addPage()
      //     }
      //     await new Promise((resolve, reject) => {
      //         doc.html(allWrapElem, {
      //             callback: function(doc) {
      //                 resolve(true)
      //             },
      //             width: 170, //target width in the PDF document
      //             height: 259, //target height in the PDF document
      //             windowWidth: 650 //window width in CSS pixels
      //         })
      //     });
      //     break;
      // }

      let tableData = [['Problem Statement'], ['']];

      const headers = tableData.splice(0, 1);
      const body = tableData;

      const columnWidth =
        (doc.internal.pageSize.width - 40) / tableData[0].length;
      // Generate the table
      (doc as any).autoTable({
        theme: 'grid',
        headStyles: {
          fillColor: '#F17339',
          textColor: 'white',
          lineWidth: 0.7,
          lineColor: 'black'
        },
        styles: {
          tableLineWidth: 5
        },
        columnStyles: {
          0: { columnWidth: columnWidth }, // Width for column 0 (Name)
          1: { columnWidth: columnWidth }, // Width for column 1 (Age)
          2: { columnWidth: columnWidth }
          // etc
        },
        bodyStyles: {
          lineWidth: 0.7,
          lineColor: 'black'
        },
        head: headers,
        body: body
      });
      doc.save('sample-document.pdf');

      // window.print();
      // contentElement.style.display = 'block';
      // const printPages = document.getElementsByClassName('print-page');
      // while (printPages.length > 0) {
      //     printPages[0].parentNode.removeChild(printPages[0]);
      // }
      // }, 50)
      // // Clean up after printing
      // window.history.back()
    })();
  }, [logoImageLoaded, backgroundImageLoaded]);
  return (
    <div
      id="content"
      className="no-print"
      style={{
        width: '100vw'
      }}
    >
      <div
        style={{
          opacity: '0',
          position: 'absolute',
          top: '0'
        }}
      >
        <img
          style={{
            width: '140px',
            transform: 'scaleX(-1)',
            height: '297mm'
          }}
          alt="background-layer"
          src="/background-layer.png"
          onLoad={() => setBackgroundImageLoaded(true)}
        />

        <img
          height={35}
          src="http://localhost:3000/logo.jpg"
          onLoad={() => setLogoImageLoaded(true)}
          alt="logo"
        />
      </div>

      {/* <div className="absolute" style={{ position: "absolute", top: '594mm', right: '0', marginRight: '-4rem', overflow: 'hidden' }}>
                <img style={{
                    width: '150px',
                    height: '297mm',
                    transform: "rotate(180deg) scaleX(-1)"
                }}
                alt="background-layer" 
                src="/background-layer.png" 
                onLoad={() => setBackgroundImageLoaded(true)} />
            </div> */}

      <div
        style={{
          position: 'relative',
          left: '75px',
          right: '75px',
          // width: 'calc(210mm - 75px)',
          width: 'calc(210mm - 150px)'
        }}
      >
        <table
          className=" w-100"
          style={{
            // pageBreakInside: 'avoid',,
            position: 'relative',
            border: '8px solid black',
            marginTop: '1rem'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#F17339',
                color: 'white',
                borderBottom: '1px solid black'
              }}
            >
              <th className="p-2">{t("PROBLEM STATEMENT")}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: '#CFE2F3',
                borderTop: '3px solid black',
                color: 'black'
              }}
            >
              <div
                style={{
                  minHeight: '120px'
                }}
                className="p-2"
              >
                {state.identifyIssue.value}
              </div>
            </tr>
          </tbody>
        </table>

        <table
          className="table-border w-100"
          style={{
            // pageBreakInside: 'avoid',,
            position: 'relative',

            marginTop: '1rem'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#F17339',
                color: 'white'
              }}
            >
              <th colSpan={2} className="p-2">
                {t("STEP 1: RECOGNIZE THE MIXTURE")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: '#CFE2F3',

                color: 'black'
              }}
            >
              <td colSpan={1} className="w-50 p-2">
                <i>{t("Who is in the mix?")}</i>
              </td>

              <td
                colSpan={1}
                style={{
                  borderLeft: '3px solid black'
                }}
                className="p-2 w-50"
              >
                <i>{t("What are their different perspectives on the issues?*")}</i>
              </td>
            </tr>

            {state.recognizeTheMixture.values.map((e) => (
              <tr
                key={e.mix + e.interest}
                style={{
                  color: 'black'
                }}
              >
                <td className="px-2">{e.mix}&nbsp;</td>
                <td
                  className="px-2"
                  style={{
                    borderLeft: '3px solid black'
                  }}
                >
                  {e.interest}&nbsp;
                </td>
              </tr>
            ))}
            {state.recognizeTheMixture.values.length < 3 &&
              Array(3 - state.recognizeTheMixture.values.length)
                .fill(0)
                .map((e, i) => (
                  <tr
                    key={i}
                    style={{
                      color: 'black'
                    }}
                  >
                    <td>&nbsp;</td>
                    <td
                      style={{
                        borderLeft: '3px solid black'
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <p>
          <i>
            {t("*May require thoughtful inquiry with other party to validate assumptions")}
          </i>
        </p>

        <table
          className="table-border w-100"
          style={{
            // pageBreakInside: 'avoid',,
            position: 'relative',
            border: '3px solid black'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#F17339',
                color: 'white'
              }}
            >
              <th colSpan={2} className="p-2">
                {t("STEP 2: ASSESS THE TENSIONS")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: '#CFE2F3',
                color: 'black'
              }}
            >
              <td colSpan={1} className="w-50 p-2">
                <i>{t("What are the causes of tension?")}</i>
              </td>

              <td colSpan={1} style={{}} className="p-2 w-50">
                <i>{t("What feelings, stresses do the individuals experience?")}</i>
              </td>
            </tr>

            {state.assessTension.values.map((e, i) => (
              <tr
                key={i}
                style={{
                  color: 'black'
                }}
              >
                <td className="px-2">{e.tension}&nbsp;</td>
                <td
                  className="px-2"
                  style={{
                    borderLeft: '3px solid black'
                  }}
                >
                  {e.feelings}&nbsp;
                </td>
              </tr>
            ))}
            {state.assessTension.values.length < 3 &&
              Array(3 - state.assessTension.values.length)
                .fill(0)
                .map((e, i) => (
                  <tr
                    key={i}
                    style={{
                      color: 'black'
                    }}
                  >
                    <td>&nbsp;</td>
                    <td
                      style={{
                        borderLeft: '3px solid black'
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        <table
          className="table-border w-100"
          style={{
            position: 'relative',
            marginTop: '1rem'
            // pageBreakInside: 'avoid',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#F17339',
                color: 'white'
              }}
            >
              <th colSpan={2} className="p-2">
                {t("STEP 3: IDENTIFY REQUIREMENTS*")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: '#CFE2F3',

                color: 'black'
              }}
            >
              <td colSpan={1} className="w-50 p-2">
                <i>{t("What are the objectives and goals?")}</i>
              </td>

              <td
                colSpan={1}
                style={{
                  borderLeft: '3px solid black'
                }}
                className="p-2 w-50"
              >
                <i>{t("What is needed to reach the goal(s)?")}</i>
              </td>
            </tr>

            {state.identifyRequirements.values.map((e, i) => (
              <tr
                key={i}
                style={{
                  color: 'black'
                }}
              >
                <td className="px-2">{e.goal}&nbsp;</td>
                <td
                  className="px-2"
                  style={{
                    borderLeft: '3px solid black'
                  }}
                >
                  {e.essentialToAchieveGoal}&nbsp;
                </td>
              </tr>
            ))}
            {state.identifyRequirements.values.length < 3 &&
              Array(3 - state.identifyRequirements.values.length)
                .fill(0)
                .map((e, i) => (
                  <tr
                    key={i}
                    style={{
                      color: 'black'
                    }}
                  >
                    <td>&nbsp;</td>
                    <td
                      style={{
                        borderLeft: '3px solid black'
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        <p>
          <i>
            {t("*Distinguish requirements from preferences, traditions, and conveniences.")}
          </i>
        </p>

        <table
          className="table-border w-100"
          style={{
            // pageBreakInside: 'avoid',,
            position: 'relative',

            marginTop: '1rem'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#F17339',
                color: 'white'
              }}
            >
              <th colSpan={2} className="p-2">
                {t("STEP 4: PROPOSE POTENTIAL ACTIONS*")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: '#CFE2F3',

                color: 'black'
              }}
            >
              <td colSpan={1} className="w-50 p-2">
                <i>{t("What actions might offer a more productive outcome?")}</i>
              </td>

              <td
                colSpan={1}
                style={{
                  borderLeft: '3px solid black'
                }}
                className="p-2 w-50"
              >
                <i>{t("What might be some results of these actions?")}</i>
              </td>
            </tr>

            {state.proposeAction.values.map((e, i) => (
              <tr
                key={i}
                style={{
                  color: 'black'
                }}
              >
                <td className="px-2">{e.action}&nbsp;</td>
                <td
                  className="px-2"
                  style={{
                    borderLeft: '3px solid black'
                  }}
                >
                  {e.result}&nbsp;
                </td>
              </tr>
            ))}
            {state.proposeAction.values.length < 3 &&
              Array(3 - state.proposeAction.values.length)
                .fill(0)
                .map((e, i) => (
                  <tr
                    key={i}
                    style={{
                      color: 'black'
                    }}
                  >
                    <td>&nbsp;</td>
                    <td
                      style={{
                        borderLeft: '3px solid black'
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        <p>
          <i>
            {t("*Ensure the actions take the perspectives into account, address the tensions, and meet the requirements.")}
          </i>
        </p>
        <table
          className="table-border w-100"
          style={{
            // pageBreakInside: 'avoid',,
            position: 'relative',

            marginTop: '1rem'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#F17339',
                color: 'white'
              }}
            >
              <th colSpan={2} className="p-2">
                {t("STEP 5: IDENTIFY ORGANIZATIONAL CULTURAL SUPPORTS AND BARRIERS")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: '#CFE2F3',

                color: 'black'
              }}
            >
              <td colSpan={1} className="w-50 p-2">
                <i>
                  {t("What organizational cultural factors may support your proposed actions?")}
                </i>
              </td>

              <td
                colSpan={1}
                style={{
                  borderLeft: '3px solid black'
                }}
                className="p-2 w-50"
              >
                <i>{t("How might you capitalize on them?")}</i>
              </td>
            </tr>

            {state.identifyOrganizationalCulturalSupport.values.map((e, i) => (
              <tr
                key={i}
                style={{
                  color: 'black'
                }}
              >
                <td className="px-2">{e.factor}&nbsp;</td>
                <td
                  className="px-2"
                  style={{
                    borderLeft: '3px solid black'
                  }}
                >
                  {e.capitalize}&nbsp;
                </td>
              </tr>
            ))}
            {state.identifyOrganizationalCulturalSupport.values.length < 2 &&
              Array(
                2 - state.identifyOrganizationalCulturalSupport.values.length
              )
                .fill(0)
                .map((e, i) => (
                  <tr
                    key={i}
                    style={{
                      color: 'black'
                    }}
                  >
                    <td>&nbsp;</td>
                    <td
                      style={{
                        borderLeft: '3px solid black'
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                ))}

            <tr
              style={{
                backgroundColor: '#CFE2F3',

                color: 'black'
              }}
            >
              <td colSpan={1} className="w-50 p-2">
                <i>
                  {t("What organizational cultural factors may impede your proposed actions?")}
                </i>
              </td>

              <td
                colSpan={1}
                style={{
                  borderLeft: '3px solid black'
                }}
                className="p-2 w-50"
              >
                <i>{t("How might you counteract them?")}</i>
              </td>
            </tr>

            {state.identifyOrganizationalCulturalBarrier.values.map((e, i) => (
              <tr
                key={i}
                style={{
                  color: 'black'
                }}
              >
                <td className="px-2">{e.factor}&nbsp;</td>
                <td
                  className="px-2"
                  style={{
                    borderLeft: '3px solid black'
                  }}
                >
                  {e.counteract}&nbsp;
                </td>
              </tr>
            ))}
            {state.identifyOrganizationalCulturalBarrier.values.length < 2 &&
              Array(
                2 - state.identifyOrganizationalCulturalBarrier.values.length
              )
                .fill(0)
                .map((e, i) => (
                  <tr
                    key={i}
                    style={{
                      color: 'black'
                    }}
                  >
                    <td>&nbsp;</td>
                    <td
                      style={{
                        borderLeft: '3px solid black'
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        <table
          className="table-border w-100"
          style={{
            position: 'relative',
            // pageBreakInside: 'avoid',,

            marginTop: '1rem'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#F17339',
                color: 'white'
              }}
            >
              <th colSpan={2} className="p-2">
                {t("STEP 6: ACTION PLAN")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: '#CFE2F3',

                color: 'black'
              }}
            >
              <td colSpan={1} className="w-50 p-2">
                <i>
                  {t("Of the possible actions listed above, which actions do you plan to take?")}
                </i>
              </td>

              <td
                colSpan={1}
                style={{
                  borderLeft: '3px solid black'
                }}
                className="p-2 w-50"
              >
                <i>
                  {t("What resources might you call on? (People, materials, equipment, systems, etc.?)")}
                </i>
              </td>
            </tr>

            {state.planYourAction.selectedActions &&
              state.planYourAction.selectedActions.map((e, i) => (
                <tr
                  key={i}
                  style={{
                    color: 'black'
                  }}
                >
                  <td className="px-2">{e}&nbsp;</td>
                  <td
                    className="px-2"
                    style={{
                      borderLeft: '3px solid black'
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
              ))}
            {state.planYourAction.selectedActions &&
              state.planYourAction.selectedActions.length < 3 &&
              Array(3 - state.planYourAction.selectedActions.length)
                .fill(0)
                .map((e, i) => (
                  <tr
                    key={i}
                    style={{
                      color: 'black'
                    }}
                  >
                    <td>&nbsp;</td>
                    <td
                      style={{
                        borderLeft: '3px solid black'
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        <table
          className="table-border w-100"
          style={{
            position: 'relative',
            // pageBreakInside: 'avoid',,

            marginTop: '1rem'
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#F17339',
                color: 'white'
              }}
            >
              <th
                style={{
                  borderLeft: '3px solid black'
                }}
                className="col-4 p-2"
              >
                {t("ACTIONS")}
              </th>

              <th
                style={{
                  borderLeft: '3px solid black'
                }}
                className="col-4 p-2"
              >
                {t("BY WHOM?")}
              </th>

              <th
                style={{
                  borderLeft: '3px solid black'
                }}
                className="col-4 p-2"
              >
                {t("BY WHEN?")}
              </th>
            </tr>
          </thead>
          <tbody>
            {state.planYourAction.values.map((e, i) => (
              <tr
                key={i}
                style={{
                  color: 'black'
                }}
              >
                <td className="px-2">{e.task}&nbsp;</td>
                <td
                  className="px-2"
                  style={{
                    borderLeft: '3px solid black'
                  }}
                >
                  {e.resource}&nbsp;
                </td>
                <td
                  className="px-2"
                  style={{
                    borderLeft: '3px solid black'
                  }}
                >
                  {e.date}&nbsp;
                </td>
              </tr>
            ))}
            {state.planYourAction.selectedActions &&
              state.planYourAction.selectedActions.length < 3 &&
              Array(3 - state.planYourAction.selectedActions.length)
                .fill(0)
                .map((e, i) => (
                  <tr
                    key={i}
                    style={{
                      color: 'black'
                    }}
                  >
                    <td>&nbsp;</td>
                    <td
                      style={{
                        borderLeft: '3px solid black'
                      }}
                    >
                      &nbsp;
                    </td>
                    <td
                      style={{
                        borderLeft: '3px solid black'
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
