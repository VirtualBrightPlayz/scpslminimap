var translation = "English";
var translations = {
  "English": {
    "Rooms": {
      "T_INTERSECTION": "",
      "X_INTERSECTION": "",
      "CURVE": "",
      "AIRLOCK_00": "Airlock",
      "AIRLOCK_01": "Airlock",
      "TESLA_GATE": "Tesla Gate",
      "CAFE": "Offices",
      "PC_SMALL": "Office Hall",
      "STRAIGHT": "",
      "SERVER_ROOM": "Server Room",
      "CHECKPOINT_B": "Elevator System B",
      "CHECKPOINT_A": "Elevator System A",
      "NUKE": "Alpha Warhead Silo",
      "WC00": "WC",
      "CLASS_D_CELLS": "Class-D Cells",
      "MICROHID": "MicroHID Armory",
      "ENTRANCE_CHECKPOINT": "Checkpoint",
      "UNDEFINED": "",
      "DR_L": "Dr. L and Room 9B",
      "PC_LARGE": "Office w/ Workstation",
      "PC_LARGE": "Offices",
      "GATE_A": "Gate A",
      "GATE_B": "Gate B",
      "HCZ_ARMORY": "HCZ Armory",
      "LCZ_ARMORY": "LCZ Armory",
      "INTERCOM": "Intercom",
      "SCP_372": "SCP-372's Containment",
      "SCP_012": "SCP-012's Containment",
      "SCP_914": "SCP-914's Containment",
      "SCP_939": "SCP-939's Containment",
      "SCP_049": "SCP-049's Containment",
      "SCP_096": "SCP-096's Containment",
      "SCP_106": "SCP-106's Containment",
      "SCP_173": "SCP-173's Containment",
      "SCP_079": "SCP-079's Containment",
    },
    "Roles": {
      "SCP_939_53": "SCP-939-53",
      "SCP_939_89": "SCP-939-89",
      "SCP_049": "SCP-049",
      "SCP_049_2": "SCP-049-2",
      "SCP_096": "SCP-096",
      "SCP_106": "SCP-106",
      "SCP_079": "SCP-079",
      "SCP_173": "SCP-173",
      "SCIENTIST": "Scientist",
      "CLASSD": "Class-D Personnel",
      "FACILITY_GUARD": "Facility Guard",
      "TUTORIAL": "TUTORIAL",
      "CHAOS_INSUGENCY": "Chaos Insurgency",
      "NTF_SCIENTIST": "Nine-Tailed Fox Scientist",
      "NTF_LIEUTENANT": "Nine-Tailed Fox Lieutenant",
      "NTF_COMMANDER": "Nine-Tailed Fox Commander",
      "NTF_CADET": "Nine-Tailed Fox Cadet",
      "SPECTATOR": "Spectator"
    },
    "Teams": {
      "CHAOS_INSURGENCY": "Chaos Insurgency",
      "CLASSD": "Class-D Personnel",
      "SCIENTISTS": "Scientist",
      "SCP": "SCP",
      "SPECTATOR": "Spectator",
      "TUTORIAL": "TUTORIAL",
      "NINETAILFOX": "Nine-Tailed Fox"
    }
  },
  /*"Memes": {
    "Rooms": {
      "Root_Troom": "",
      "Root_Crossing": "",
      //Yes, I know it's here a second time
      "Root_ Crossing": "",
      "Root_Room3": "",
      "Root_Curve": "",
      "Root_Airlock": "",
      "Root_Tesla": "Magic SCP Killer",
      "Root_Cafeteria": "",
      "Root_Cafe ": "Place with keycard",
      "Root_Straight": "",
      //Yes, I know it's here a second time
      "Root_ Straight": "",
      "Root_Servers": "",
      "Root_LiftB": "Y go back down B",
      "Root_LiftA": "Y go back down A",
      "Root_Nuke": "Nuke!",
      "Root_Toilets": "Gun might spawn here",
      "Root_Vent": "SCP-420-J Farm",
      "Root_ClassDSpawn": "D-BOIIIZZZ",
      "Root_ChkpA": "Exit from D-Bois A",
      "Root_ChkpB": "Exit from D-Bois B",
      "Root_Hid": "The Micro",
      "Root_Checkpoint": "",
      "Root_Endoof": "",
      "Root_CollapsedTunnel": "",
      "Root_Smallrooms2": "",
      "Root_upstairs": "",
      "Root_PCs": "",
      "Root_Shelter": "",
      "Root_GateA": "Exit from SCP-Ville A",
      "Root_GateB": "Exit from SCP-Ville B",
      "Root_Armory": "Gunz and more Gunz",
      "Root_Intercom": "Mic-spam Central",
      "Root_372": "A Gun can spawn here.",
      "Root_012": "Trap Spooks here",
      "Root_914": "Nine-Fourteen",
      "Root_Testroom": "Doggo's Room",
      "Root_049": "Plague Doctor's Place",
      "Root_457": "Shy Guy's",
      "Root_106": "RADICAL LARRY'S!",
      "Root_173": "Peanut's",
      "Root_079": "Ded end. and ur end.",
      //The following are not rooms, but will appear on the map
      "DoorsLight": "",
      "DoorsHeavy": "",
      "Map_PD_Main": ""
    },
    "Roles": {
      "SCP_939_53": "Doggo-1",
      "SCP_939_89": "Doggo-1",
      "SCP_049": "Plague Doctor",
      "SCP_049_2": "Airplane",
      "SCP_096": "Shy Guy",
      "SCP_106": "RADICAL LARRY",
      "SCP_079": "Spooky-079",
      "SCP_173": "Peanut",
      "SCIENTIST": "Nerd",
      "CLASSD": "D-Boi",
      "FACILITY_GUARD": "Useless MTF",
      "TUTORIAL": "GOD",
      "CHAOS_INSUGENCY": "MTF Killers",
      "NTF_SCIENTIST": "MTF Nerd",
      "NTF_LIEUTENANT": "Lieutenant",
      "NTF_COMMANDER": "Commander",
      "NTF_CADET": "Cadet",
      "SPECTATOR": "Ded boi"
    },
    "Teams": {
      "CHAOS_INSURGENCY": "Chaos Insurgency",
      "CLASSD": "Class-D Personnel",
      "SCIENTISTS": "Scientist",
      "SCP": "SCP",
      "SPECTATOR": "Spectator",
      "TUTORIAL": "TUTORIAL",
      "NINETAILFOX": "Nine-Tailed Fox"
    }
  }*/
};

var images = {
  "T_INTERSECTION": "Troom.png",
  "HCZ_ARMORY": "Troom.png",
  "X_INTERSECTION": "Crossing.png",
  //Yes, I know it's here a second time
  //"Root_ Crossing": "Crossing.png",
  //"Root_Room3": "Troom.png",
  "CURVE": "Curve.png",
  "AIRLOCK_00": "Airlock.png",
  "AIRLOCK_01": "Airlock.png",
  "TESLA_GATE": "Tesla.png",
  "PC_SMALL": "Straight.png",
  "CAFE": "Cafe.png",
  "STRAIGHT": "Straight.png",
  "DR_L": "Straight.png",
  "CUBICLES": "Straight.png",
  //Yes, I know it's here a second time
  //"Root_ Straight": "Straight.png",
  "SERVER_ROOM": "Servers.png",
  "CHECKPOINT_B": "Lift.png",
  "CHECKPOINT_A": "Lift.png",
  // TODO: Add custom mapping for nuke room.
  "NUKE": "Straight.png",
  "WC00": "WC.png",
  //"Root_Vent": "Vent.png",
  "CLASS_D_CELLS": "ClassD.png",
  /*"Root_ChkpA": "Chkp.png",
  "Root_ChkpB": "Chkp.png",*/
  "MICROHID": "HID.png",
  "ENTRANCE_CHECKPOINT": "Checkpoint.png",
  //"Root_Endoof": "Endoof.png",
  //"Root_CollapsedTunnel": "CollapsedTunnel.png",
  "UNDEFINED": "Straight.png",
  "PC_LARGE": "upstairs.png",
  //"PC_LARGE": "Straight.png",
  //"Root_Shelter": "Shelter.png",
  "GATE_A": "GateA.png",
  "GATE_B": "GateB.png",
  "LCZ_ARMORY": "Armory.png",
  "INTERCOM": "Curve.png",
  "SCP_372": "372.png",
  "SCP_012": "Straight.png",
  "SCP_914": "914.png",
  "SCP_939": "Testroom.png",
  "SCP_049": "049.png",
  "SCP_096": "096.png",
  "SCP_106": "106.png",
  "SCP_173": "173.png",
  "SCP_079": "Straight.png",
};

//All values are required in order to work.
var imagesizes = {
  "SCP_106": {
    "x": 49.5,
    "y": 36.5,
    "posx": -13,
    "posy": -14.1
  },
  "CLASS_D_CELLS": {
    "x": 75,
    "y": 21.29,
    "posx": 25,
    "posy": 0
  }
};
