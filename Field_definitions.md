---
author: John D. Muccigrosso
title: Field Definitions
date: Sunday, 5 January 2020
---

## Introduction

The following is a list of the fields found in the database and how they are defined.

## Fields

| Name      | Definition  |
|:--------- |:----------- |
| id | Unique internal ID number, starting at 1000001 to avoid issues with leading zeroes. |
| name | Common name of the temple, if any, typically in English. |
| dedicatee | Divinity/-ies to whom the temple was dedicated, typically in English, using Roman (not Greek) version. |
| type | Type of structure (temple, mithraeum, etc). Almost all are temples.
| location | Name of locale in which the temple is found, whether ancient or modern, smaller than a city or whatever is listed in ancient/modern place. For example, *Campus Martius* in Rome.
| modernplace | Modern name for the place in which the temple was found. |
| ancientplace | Ancient name for the place in which the temple was found. |
| pleiadesplace | Pleiades ID for the place in which the temple was found. Not to be confused with field "pleiades" which is the Pleiades entry that is the same as the database entry. |
| country | Modern country in which the temple was found. |
| latitude | Latitude of the location of the temple. Right now these all presume the exact location is known, that is, there's no indication of accuracy. |
| longitude | Longitude of the location of the temple. Right now these all presume the exact location is known, that is, there's no indication of accuracy. |
| orientation | Orientation in degrees (1-360°) of the temple, where 0/360° is north. These were mostly obtained from Google maps, though some are taken from published plans. |
| compass | Conversion of orientation into one of eight directions (N, NE, E, etc).
| vowed | Year of vow for the building of the temple. Mainly applies to ones in the city of Rome. Negative numbers for BCE. |
| date | Date (often descriptive, e.g., "early 1st c. BCE") of the dedication/start of the temple.
| startdateearly | Date for the early side of the start-date range. |
| startdatelate | Date for the late side of the start-date range. |
| century | Century of start of temple's use with negative number for BCE. |
| enddate | Date for the end of temple's use with negative number for BCE. |
| preceded | ID of temple that preceded the one in question. Not much used yet. |
| succeeded | ID of temple that replaced the one in question. Not much used yet. |
| sex | Sex of the divinity to whom the temple is dedicated, including "both".
| dedicationday | Calendar date for the dedication of the temple. Mainly applies to the city of Rome. |
| deitytype | Description of the nature of the deity with multiple values possible. Allowed values are: god, hero, concept, city, emperor, family. |
| culture | Culture to which the temple belonged, broadly speaking. For example, Greek or Roman.
| style |  Architectural type of the temple. |
| extant | Is the temple still in existence, even if fragmentary?
| source | Other database or project that was the original source for this entry.
| meetings | Did the Roman senate meet in the temple. Only applies to ones in the city of Rome. |
| note | Pertinent note. |
| vici | Vici.org ID for the temple. |
| pleiades | Pleiades ID for the temple. |
| dare | DARE ID for the temple (*defunct?*). |
| arachne | DAIR's Arachne ID for the temple. |
| livius | Livius ID for the temple. |
| wikipedia | Wikipedia article for the temple. |
| wikidata | Wikidata ID for the temple. |
| digitalromanforum | Digital Roman Forum ID for the temple. |
| digitalesforumromanum | Digitales Forum Romanam ID for the temple. |
| trismegistos | Trismegistos ID for the temple. |
| ads | Archeological Data Service ID for the temple (British). |
| cona | Getty Cultural Objects Names Authority ID for the temple. |
| topostext | ID for the temple. |
| url | External URL for the temple. |
| checked | Whether I looked at the evidence for the the temple to confirm its existence. |
