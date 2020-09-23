from pykml import parser
from pykml.factory import KML_ElementMaker as KML
from lxml import etree

with open('src/assets/kml/Maine_Boundaries_County_Polygon.kml') as f:
    doc = parser.parse(f).getroot().Document

kmlData = KML.Folder()
for place in doc.Folder.Placemark:
    schemaData = place.ExtendedData.SchemaData.SimpleData
    county = schemaData[1].text
    coords = place.Polygon.outerBoundaryIs.LinearRing.coordinates.text
    kmlData.append(KML.Placemark(
        KML.name(county),
        KML.LinearRing(
            KML.coordinates(coords)
        )

    ))

with open('maine_counties.kml', 'w') as f:
    f.write(etree.tostring(kmlData, pretty_print=True).decode("utf-8"))