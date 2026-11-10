const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const detector = require('../shared/detector.js');
const swift = fs.readFileSync(path.join(__dirname, '../../Sources/MeetingDetection/Detection.swift'), 'utf8');
function swiftList(name) {
  const match = new RegExp(`static let ${name} = \\[([^\\]]*)\\]`).exec(swift);
  assert.ok(match, `Detection.swift no longer declares ${name}`);
  return [...match[1].matchAll(/"([^"]*)"/g)].map(item => item[1]);
}
const sorted = list => [...list].sort();
test('Swift and JavaScript detectors share the same phrase lists', () => {
  const {rules} = detector;
  assert.deepEqual(sorted(rules.end['Google Meet']), sorted(swiftList('meetEnd')));
  assert.deepEqual(sorted(rules.end['Microsoft Teams']), sorted(swiftList('teamsEnd')));
  assert.deepEqual(sorted(rules.end['Webex']), sorted(swiftList('webexEnd')));
  assert.deepEqual(sorted(rules.end['Zoom']), sorted(swiftList('zoomEnd')));
  assert.deepEqual(sorted(rules.stopSharing), sorted(swiftList('stopSharing')));
  assert.deepEqual(sorted(rules.teamsLeaveCompanions), sorted(swiftList('teamsLeaveCompanions')));
  assert.deepEqual(sorted(rules.zoomLeaveCompanions), sorted(swiftList('zoomLeaveCompanions')));
  assert.deepEqual(sorted(rules.endedAny), sorted(swiftList('endedAny')));
  assert.deepEqual(sorted(rules.endedZoom), sorted(swiftList('endedZoom')));
  assert.deepEqual(sorted(rules.localizedLeave), sorted(swiftList('localizedLeave')));
  assert.deepEqual(sorted(rules.localizedStopSharing), sorted(swiftList('localizedStopSharing')));
});
test('Swift detector uses every mirrored phrase list it declares', () => {
  // A declared-but-unused list would pass the comparison above while evaluate() drifts.
  for (const name of ['meetEnd', 'teamsEnd', 'webexEnd', 'zoomEnd', 'stopSharing', 'teamsLeaveCompanions',
    'zoomLeaveCompanions', 'endedAny', 'endedZoom', 'localizedLeave', 'localizedStopSharing']) {
    const uses = swift.match(new RegExp(`\\b${name}\\b`, 'g')) || [];
    assert.ok(uses.length >= 2, `Detection.swift declares ${name} but never uses it`);
  }
});
