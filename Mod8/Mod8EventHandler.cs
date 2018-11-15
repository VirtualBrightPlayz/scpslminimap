using Smod2;
using Smod2.API;
using Smod2.EventHandlers;
using Smod2.Events;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using UnityEngine;

namespace VirtualBrightPlayz.SCPSL.Mod8
{
    internal class Mod8EventHandler : IEventHandlerFixedUpdate, IEventHandlerRoundStart, IEventHandlerPlayerJoin, IEventHandlerDisconnect
    {
        private Plugin plugin;
        private ImageGenerator img;
        private float pTime;
        public Dictionary<string, string> conns;
        public Dictionary<string, string> keys;
        public const string pswd = "abcdefghijklmnopqrstuvwxyz0123456789";


        public Mod8EventHandler(Plugin mod8)
        {
            this.plugin = mod8;
            this.conns = new Dictionary<string, string>();
            this.keys = new Dictionary<string, string>();
        }

        void IEventHandlerPlayerJoin.OnPlayerJoin(PlayerJoinEvent ev)
        {
            if (keys.ContainsKey(ev.Player.SteamId))
            {
                ev.Player.SendConsoleMessage("Your SteamID is: " + ev.Player.SteamId);
                ev.Player.SendConsoleMessage("Your key is: " + keys[ev.Player.SteamId]);
                return;
            }
            string newkey = "";
            for (int i = 0; i < 5; i++)
            {
                newkey += pswd[UnityEngine.Random.Range(0, pswd.Length)];
            }
            plugin.Info(ev.Player.IpAddress);
            conns.Add(ev.Player.IpAddress, ev.Player.SteamId);
            keys.Add(ev.Player.SteamId, newkey);
            ev.Player.SendConsoleMessage("Your SteamID is: " + ev.Player.SteamId);
            ev.Player.SendConsoleMessage("Your new key is: " + newkey);
        }

        void IEventHandlerDisconnect.OnDisconnect(DisconnectEvent ev)
        {
            string keyrm = string.Empty;
            string connrm = string.Empty;
            foreach (var conn in conns)
            {
                bool hasfound = false;
                plugin.Info(conn.Value);
                foreach (var item in plugin.Server.GetPlayers())
                {
                    if (item.SteamId == conn.Value)
                    {
                        hasfound = true;
                        break;
                    }
                }
                if (!hasfound)
                {
                    keyrm = conn.Value;
                    connrm = conn.Key;
                }
            }
            if (keyrm != string.Empty && connrm != string.Empty)
            {
                plugin.Info(connrm + " has disconnected");
                conns.Remove(connrm);
                keys.Remove(keyrm);
            }
        }

        void IEventHandlerFixedUpdate.OnFixedUpdate(FixedUpdateEvent ev)
        {
            //plugin.Info(ServerTime.time.ToString());
            pTime -= Time.fixedDeltaTime;
            if (pTime < 0)
            {
                pTime = 1;
                //plugin.Info(Math.Floor(Time.realtimeSinceStartup) + "running");
                try
                {
                    var mod8 = (Mod8)plugin;
                    //mod8.rm.
                    //Texture2D texure = new Texture2D(img.colorMap.Count * 5, img.colorMap.Count * 5);
                    /*img.GenerateMap(0);
                    string str = string.Empty;
                    str += " { ";
                    str += " \"rooms\": [ ";
                    var objs = img.colorMap;
                    for (int i = 0; i < objs.Count; i++)
                    {
                        var obj = objs[i];
                        str += " { ";
                        str += " \"posx\": \"" + obj.centerOffset.x.ToString() + "\", ";
                        str += " \"posy\": \"" + obj.centerOffset.y.ToString() + "\", ";
                        str += " \"posz\": \"" + obj.centerOffset.y.ToString() + "\", ";

                        str += " \"rotx\": \"" + obj.rotationY.ToString() + "\", ";
                        str += " \"roty\": \"" + obj.rotationY.ToString() + "\", ";
                        str += " \"rotz\": \"" + obj.rotationY.ToString() + "\", ";

                        str += " \"id\": \"" + obj.type.ToString() + "\" ";
                        if (i + 1 >= objs.Count)
                        {
                            str += " } ";
                        }
                        else
                        {
                            str += " }, ";
                        }
                    }
                    str += " ] ";
                    str += " } ";
                    str += ";";*/
                    /*foreach (var room in mod8.rm.rooms)
                    {
                        byte[] tex = ((Texture2D)room.icon.texture).EncodeToPNG();
                        File.WriteAllBytes(Application.dataPath + "/../" + room.label + ".png", tex);
                    }*/

                    //plugin.Info(RemoteAdmin.QueryProcessor.Localplayer.NetworkServerRandom);
                    //plugin.Info(RemoteAdmin.QueryProcessor.Localplayer.ServerRandom);
                    //plugin.Info(RemoteAdmin.QueryProcessor.ServerStaticRandom);
                    if (!RandomSeedSync.generated)
                    {
                        /*plugin.Info("not generated");
                        var rss = PlayerManager.localPlayer.GetComponent<RandomSeedSync>();
                        img = (ImageGenerator)GameObject.FindObjectOfType(typeof(ImageGenerator));
                        //mod8.rm.GenerateMap(rss.Networkseed);
                        plugin.Info(img.GenerateMap(rss.Networkseed).ToString());
                        //plugin.Info(img.roomsOfType.Length.ToString());
                        foreach (var item in img.roomsOfType)
                        {
                            foreach (var item2 in item.roomsOfType)
                            {
                                plugin.Info(item2.label);
                                plugin.Info(item2.type.ToString());
                                /*var tex = (Texture2D)item2.iconMinimap;
                                var bytes = tex.EncodeToPNG();
                                File.WriteAllBytes(Application.dataPath + "/../" + item2.label + ".png", bytes);*
                            }
                        }*/
                    }

                    /*var lczRooms = GameObject.Find("LightRooms").transform;
                    foreach (Transform room in lczRooms)
                    {
                        plugin.Info(room.gameObject.name);
                    }
                    plugin.Info(lczRooms.childCount.ToString());*/

                    //var local = PlayerManager.localPlayer.GetComponents<Component>();
                    /*plugin.Info(local.Length.ToString());
                    foreach (var comp in local)
                    {
                        plugin.Info(comp.GetType().ToString());
                    }*/

                    //plugin.Info(img.availableRooms.Count.ToString());

                    string str = string.Empty;
                    str += " { ";
                    str += " \"lczrooms\": [ ";
                    var objs = GameObject.Find("LightRooms").transform;
                    for (int i = 0; i < objs.childCount; i++)
                    {
                        var obj = objs.GetChild(i).gameObject;
                        str += " { ";
                        str += " \"posx\": \"" + obj.transform.position.x.ToString() + "\", ";
                        str += " \"posy\": \"" + obj.transform.position.y.ToString() + "\", ";
                        str += " \"posz\": \"" + obj.transform.position.z.ToString() + "\", ";

                        str += " \"rotx\": \"" + obj.transform.rotation.eulerAngles.x.ToString() + "\", ";
                        str += " \"roty\": \"" + obj.transform.rotation.eulerAngles.y.ToString() + "\", ";
                        str += " \"rotz\": \"" + obj.transform.rotation.eulerAngles.z.ToString() + "\", ";

                        str += " \"id\": \"" + obj.name + "\" ";
                        if (i + 1 >= objs.childCount)
                        {
                            str += " } ";
                        }
                        else
                        {
                            str += " }, ";
                        }
                    }
                    str += " ], ";

                    str += " \"hczrooms\": [ ";
                    var objs2 = GameObject.Find("Heavy rooms").transform;
                    for (int i = 0; i < objs2.childCount; i++)
                    {
                        var obj = objs2.GetChild(i).gameObject;
                        str += " { ";
                        str += " \"posx\": \"" + obj.transform.position.x.ToString() + "\", ";
                        str += " \"posy\": \"" + obj.transform.position.y.ToString() + "\", ";
                        str += " \"posz\": \"" + obj.transform.position.z.ToString() + "\", ";

                        str += " \"rotx\": \"" + obj.transform.rotation.eulerAngles.x.ToString() + "\", ";
                        str += " \"roty\": \"" + obj.transform.rotation.eulerAngles.y.ToString() + "\", ";
                        str += " \"rotz\": \"" + obj.transform.rotation.eulerAngles.z.ToString() + "\", ";

                        str += " \"id\": \"" + obj.name + "\" ";
                        if (i + 1 >= objs2.childCount)
                        {
                            str += " } ";
                        }
                        else
                        {
                            str += " }, ";
                        }
                    }
                    str += " ], ";

                    str += " \"ezrooms\": [ ";
                    var objs3 = GameObject.Find("EntranceRooms").transform;
                    for (int i = 0; i < objs3.childCount; i++)
                    {
                        var obj = objs3.GetChild(i).gameObject;
                        str += " { ";
                        str += " \"posx\": \"" + obj.transform.position.x.ToString() + "\", ";
                        str += " \"posy\": \"" + obj.transform.position.y.ToString() + "\", ";
                        str += " \"posz\": \"" + obj.transform.position.z.ToString() + "\", ";

                        str += " \"rotx\": \"" + obj.transform.rotation.eulerAngles.x.ToString() + "\", ";
                        str += " \"roty\": \"" + obj.transform.rotation.eulerAngles.y.ToString() + "\", ";
                        str += " \"rotz\": \"" + obj.transform.rotation.eulerAngles.z.ToString() + "\", ";

                        str += " \"id\": \"" + obj.name + "\" ";
                        if (i + 1 >= objs3.childCount)
                        {
                            str += " } ";
                        }
                        else
                        {
                            str += " }, ";
                        }
                    }
                    str += " ], ";

                    str += " \"players\": [ ";
                    var pls = plugin.Server.GetPlayers();
                    for (int i = 0; i < pls.Count; i++)
                    {
                        var play = pls[i];
                        GameObject obj = (GameObject)pls[i].GetGameObject();
                        str += " { ";

                        str += " \"posx\": \"" + obj.transform.position.x.ToString() + "\", ";
                        str += " \"posy\": \"" + obj.transform.position.y.ToString() + "\", ";
                        str += " \"posz\": \"" + obj.transform.position.z.ToString() + "\", ";

                        str += " \"rotx\": \"" + obj.transform.rotation.eulerAngles.x.ToString() + "\", ";
                        str += " \"roty\": \"" + obj.transform.rotation.eulerAngles.y.ToString() + "\", ";
                        str += " \"rotz\": \"" + obj.transform.rotation.eulerAngles.z.ToString() + "\", ";

                        str += " \"team\": \"" + play.TeamRole.Team.ToString() + "\", ";
                        str += " \"role\": \"" + play.TeamRole.Role.ToString() + "\", ";
                        str += " \"ip\": \"" + play.IpAddress + "\", ";
                        str += " \"steamid\": \"" + play.SteamId + "\", ";
                        str += " \"key\": \"" + keys[play.SteamId] + "\", ";
                        str += " \"name\": \"" + play.Name + "\" ";
                        if (i + 1 >= pls.Count)
                        {
                            str += " } ";
                        }
                        else
                        {
                            str += " }, ";
                        }
                    }
                    str += " ] ";
                    str += " } ";
                    str += ";";
                    ASCIIEncoding asen = new ASCIIEncoding();
                    byte[] ba = asen.GetBytes(str);
                    //plugin.Info("Transmitting.....");

                    mod8.s.Write(ba, 0, ba.Length);
                    /*foreach (var room in rooms)
                    {
                        plugin.Info(room.readonlyPoint.position.ToString());
                    }*/
                }
                catch (Exception e)
                {
                    plugin.Info(e.Message);
                }
            }
        }

        void IEventHandlerRoundStart.OnRoundStart(RoundStartEvent ev)
        {
            Mod8 mod8 = (Mod8)plugin;
            /*foreach (var item in PlayerManager.localPlayer.GetComponents<Component>())
            {
                File.AppendAllText(Application.dataPath + "/../file.txt", item.GetType().ToString() + '\n');
            }
            foreach (GameObject item in GameObject.FindObjectsOfType(typeof(GameObject)))
            {
                File.AppendAllText(Application.dataPath + "/../file69.txt", item.name + '\n');
            }*/
        }
    }
}
