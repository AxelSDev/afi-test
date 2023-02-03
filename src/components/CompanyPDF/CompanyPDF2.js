import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import truck from '../../images/truck2tiny.png';
import logo from '../../images/AFIwhitelogoPDF.png';

const CompanyPDF2 = ({pdfData}) => {
  const trucks = pdfData.response.totalPowerUnits;
  const drivers = pdfData.response.totalDrivers;
  const totalPremium = trucks !== null ? trucks * 12128  : 12128;
  const monthlyPremium = totalPremium / 12;
  const premiumPerTruck = trucks !== null ? monthlyPremium / trucks : monthlyPremium;
  const DOTNmber = pdfData.DOTNumber || 0;
  const companyName = pdfData.response.legalName.toUpperCase() || 'NO NAME';
  const todayTitle = pdfData.effectiveDate;
  const year = todayTitle.slice(0, 4);
  const month = todayTitle.slice(5, 7);
  const day = todayTitle.slice(8, 10);
  const effectiveDate = month + '/' + day + '/' + year;
  const address = pdfData.response.phyStreet + ', ' + pdfData.response.phyCity + ', ' + pdfData.response.phyState + pdfData.response.phyZipcode ||"No address"
  const producerNumber = pdfData.producer.WorkPhone;
  const producerMail = pdfData.producer.EmailAddress;
  const producerName = pdfData.producer.AgentName;
  const producerImage = pdfData.producer.URLImage;

  const numberWithCommas = (x) => {
    return x.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Document title={companyName}>
      <Page size="A4">
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgb(1,32,96)",
              padding: "8px"
            }}
          >
            <Image src={logo} alt="CoverWhale logo" style={{width: "27%"}} />
            <View
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                fontFamily: 'Helvetica-Bold'
              }}
            >
              <View
                style={{
                  fontSize: '7px',
                  textAlign: 'rigth',
                  color: "rgb(164,169,178)",
                }}
              >
                <Text style={{alignSelf: 'flex-end'}}>DOT Number: {DOTNmber}</Text>
                <Text style={{ alignSelf: 'flex-end'}}>Effective Date: {effectiveDate}</Text>
                <Text style={{ alignSelf: 'flex-end'}}>{companyName}</Text>
              </View>
              <Text
                style={{
                  fontSize: '18px',
                  textAlign: 'rigth',
                  alignSelf: "flex-end",
                  color: "white",
                  fontFamily: 'Helvetica-Bold'
                }}
              >
                {producerNumber}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "16px",
              fontSize: '24px',
              fontFamily: "Helvetica-Bold"
            }}
          >
            <Text>Commercial Trucking Quote for:</Text>
            <Text style={{ fontSize: "18px", marginTop: "10px"}}>{companyName}</Text>
            <View
              style={{
                marginTop: "12px",
                marginHorizontal: "32px",
                fontSize: '11px',
                textAlign: 'center',
                fontFamily: 'Times-Roman'
              }}
            >
              <Text>It’s almost time for you to renew your insurance. We went ahead and shopped our partner carriers to find you the right</Text>
              <Text>coverage at the best price. We would love to help you save money and provide you with world class customer support.</Text>
            </View>
          </View>
          <View
            style={{
              width: "95%",
              marginTop: "12px",
              display: "flex",
              flexDirection: "row",
              alignSelf: "flex-start",
            }}
          >
            <Image src={truck} alt="truck" style={{width: '58%'}} />
            <View 
              style={{
                width: '42%',
                height: "115px",
                marginTop: "12px",
                backgroundColor: "rgb(255,255,0)",
                fontFamily: 'Helvetica-Bold',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "4px"
              }}
            >
              <Text style={{marginBottom: "2px", marginTop: "12px", fontSize: "16px"}}>Estimated Monthly Premium</Text>
              <Text style={{fontSize: "48px"}}>${numberWithCommas(monthlyPremium)}</Text>
              <Text style={{fontFamily: 'Helvetica-Oblique', fontSize: "10px", marginTop: "auto", marginBottom: "2px"}}>or ${numberWithCommas(premiumPerTruck)} per truck</Text>
            </View>
          </View>
          <View
            style={{
              width: "90%",
              fontSize: '11px',
              marginTop: "16px",
              borderBottom: "1px solid black"
            }}
          >
            <View
              style={{
                backgroundColor: "rgb(1, 32, 96)",
                color: "white",
                paddingTop: "9px",
                paddingHorizontal: "9px",
                paddingBottom: "5px",
                fontFamily: 'Helvetica-Bold'
              }}
            >
              <Text>Quote Prepared For</Text>
            </View>
            <View
              style={{
                paddingHorizontal: "9px",
                paddingVertical: "4px",
                display: "flex",
                flexDirection: 'row',
                backgroundColor: 'rgb(242, 242, 242)'
              }}
            >
              <Text style={{width: "30%", fontFamily: 'Helvetica-Bold'}}>Insured Name</Text>
              <Text style={{width: "70%", textAlign: "right"}}>{companyName}</Text>
            </View>
            <View
              style={{
                paddingHorizontal: "9px",
                paddingVertical: "4px",
                display: "flex",
                flexDirection: 'row',
                alignItems: "center"
              }}
            >
              <Text style={{width: "30%", fontFamily: 'Helvetica-Bold'}}>Address</Text>
              <Text style={{width: "70%", textAlign: "right"}}>{address}</Text>
            </View>
            <View
              style={{
                paddingHorizontal: "9px",
                paddingVertical: "4px",
                display: "flex",
                flexDirection: 'row',
                backgroundColor: 'rgb(242, 242, 242)'
              }}
            >
              <Text style={{width: "30%", fontFamily: 'Helvetica-Bold'}}>Fleet Size</Text>
              <Text style={{width: "70%", textAlign: "right"}}>{trucks}</Text>
            </View>
            <View
              style={{
                paddingHorizontal: "9px",
                paddingVertical: "4px",
                display: "flex",
                flexDirection: 'row',
                alignItems: "center"
              }}
            >
              <Text style={{width: "30%", fontFamily: 'Helvetica-Bold'}}>Number of Drivers</Text>
              <Text style={{width: "70%", textAlign: "right"}}>{drivers}</Text>
            </View>
          </View>
          <View
            style={{
              width: "90%",
              fontSize: '11px',
              marginTop: "16px",
              borderBottom: "1px solid black"
            }}
          >
            <View
              style={{
                backgroundColor: "rgb(1, 32, 96)",
                color: "white",
                paddingTop: "9px",
                paddingHorizontal: "9px",
                paddingBottom: "5px",
                fontFamily: 'Helvetica-Bold',
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text>Coverages</Text>
              <Text>Coverage Limits</Text>
            </View>
            <View
              style={{
                paddingHorizontal: "9px",
                paddingVertical: "4px",
                display: "flex",
                flexDirection: 'row',
                backgroundColor: 'rgb(242, 242, 242)'
              }}
            >
              <Text style={{width: "30%", fontFamily: 'Helvetica-Bold'}}>Auto Liability</Text>
              <Text style={{width: "70%", textAlign: "right"}}>$1,000,000</Text>
            </View>
            <View
              style={{
                paddingHorizontal: "9px",
                paddingVertical: "4px",
                display: "flex",
                flexDirection: 'row',
                alignItems: "center"
              }}
            >
              <Text style={{width: "30%", fontFamily: 'Helvetica-Bold'}}>Physical Damage</Text>
              <Text style={{width: "70%", textAlign: "right"}}>Included</Text>
            </View>
            <View
              style={{
                paddingHorizontal: "9px",
                paddingVertical: "4px",
                display: "flex",
                flexDirection: 'row',
                backgroundColor: 'rgb(242, 242, 242)'
              }}
            >
              <Text style={{width: "30%", fontFamily: 'Helvetica-Bold'}}>Motor Truck Cargo</Text>
              <Text style={{width: "70%", textAlign: "right"}}>$100,000</Text>
            </View>
            <View
              style={{
                paddingHorizontal: "9px",
                paddingVertical: "4px",
                display: "flex",
                flexDirection: 'row',
                alignItems: "center"
              }}
            >
              <Text style={{width: "30%", fontFamily: 'Helvetica-Bold'}}>General Liability</Text>
              <Text style={{width: "70%", textAlign: "right"}}>$1,000,000</Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "rgb(218,227,243)",
              width: "90%",
              marginTop: "16px"
            }}
          >
            <Image src={producerImage}alt="CoverWhale logo"style={{width: "17%"}} />
            <View 
              style={{
                width: "83%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "8px",
                paddingBottom: "16px",
                paddingHorizontal: "4px"
              }}
            >
              <View style={{fontFamily: 'Helvetica-Oblique', fontSize: "9px"}}>
                <Text>“Hey there! This is {producerName} at American Fleet - America’s #1 Fleet Insurance Broker. I‘d love</Text>
                <Text>the opportunity to earn your business. Please contact me today with any questions or to get started.”</Text>
              </View>
              <Text style={{fontFamily: "Helvetica-Bold"}}>{producerNumber}   |   {producerMail}</Text>
            </View>
          </View>
          <View
            style={{
              width:"100%",
              display: "flex",
              flexDirection: 'column',
              alignItems: "center",
              marginTop: "auto",
              color: "rgb(119,114,125)",
              fontSize: "8px",
              marginBottom: "3px"
            }}
          >
            <Text style={{fontFamily: 'Helvetica-Oblique'}}>Your actual premium may be higher or lower based on a number of factors. Coverages and discounts are subject to policy terms, conditions,</Text>
            <Text style={{fontFamily: 'Helvetica-Oblique'}}>qualifications, and availability. This proposal does not contain all possible coverage options and is only intended to highlight some of your coverage</Text>
            <Text style={{fontFamily: 'Helvetica-Oblique', marginBottom: "6px"}}>options. Please contact American Fleet to further discuss all of the additional coverage options which may be available.</Text>
            <View
                style={{
                  width:"100%",
                  padding: "8px",
                  display: "flex",
                  flexDirection: 'row',
                  justifyContent: "center",
                  alignItems: "center",
                  borderTop: '1px solid black',
                  fontSize: "10px",
                  color: "black"
                }}
              >
              <Text>AmericanFleetInsurance.com</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CompanyPDF2;
