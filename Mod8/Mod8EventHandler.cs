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
    internal class Mod8EventHandler : IEventHandlerFixedUpdate, IEventHandlerPlayerJoin, IEventHandlerDisconnect
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
            /*if (keys.ContainsKey(ev.Player.SteamId))
            {
                ev.Player.SendConsoleMessage("Your SteamID is: " + ev.Player.SteamId);
                ev.Player.SendConsoleMessage("Your key is: " + keys[ev.Player.SteamId]);
                return;
            }*/
            string newkey = "";
            for (int i = 0; i < 5; i++)
            {
                newkey += pswd[UnityEngine.Random.Range(0, pswd.Length)];
            }
            //plugin.Info(ev.Player.IpAddress);
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
                //plugin.Info(conn.Value);
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
                //plugin.Info(connrm + " has disconnected");
                conns.Remove(connrm);
                keys.Remove(keyrm);
            }
        }

        void IEventHandlerFixedUpdate.OnFixedUpdate(FixedUpdateEvent ev)
        {
            pTime -= Time.fixedDeltaTime;
            if (pTime < 0)
            {
                pTime = ConfigManager.Manager.Config.GetIntValue("mimp_ping", 1);
                try
                {
                    var mod8 = (Mod8)plugin;

                    if (!mod8.tcp.Connected || !mod8.s.CanWrite)
                    {
                        mod8.tcp.Close();
                        mod8.tcp = new System.Net.Sockets.TcpClient();
                        try
                        {
                            mod8.tcp.Connect(ConfigManager.Manager.Config.GetStringValue("mimp_tcpmapip", "127.0.0.1"), ConfigManager.Manager.Config.GetIntValue("mimp_tcpmapport", 8080));
                            mod8.s = mod8.tcp.GetStream();
                        }
                        catch (Exception e)
                        {

                        }
                    }

                    string str = string.Empty;
                    str += " { ";
                    str += " \"rooms\": [ ";
                    var rooms = plugin.Server.Map.Get079InteractionRooms(Scp079InteractionType.CAMERA);
                    bool first = true;
                    foreach (var room in rooms)
                    {
                        if (room.ZoneType != ZoneType.UNDEFINED)
                        {
                            if (first)
                            {
                                str += " { ";
                                first = false;
                            }
                            else
                                str += ", { ";
                            var obj = (GameObject)room.GetGameObject();
                            str += " \"posx\": \"" + obj.transform.position.x.ToString() + "\", ";
                            str += " \"posy\": \"" + obj.transform.position.y.ToString() + "\", ";
                            str += " \"posz\": \"" + obj.transform.position.z.ToString() + "\", ";

                            str += " \"rotx\": \"" + obj.transform.rotation.eulerAngles.x.ToString() + "\", ";
                            /*if (room.ZoneType == ZoneType.ENTRANCE && (room.RoomType == RoomType.INTERCOM || room.RoomType == RoomType.CURVE))
                            {
                                str += " \"roty\": \"" + (obj.transform.localRotation.eulerAngles.y - 270).ToString() + "\", ";
                            }
                            else if (room.ZoneType == ZoneType.ENTRANCE && !(room.RoomType == RoomType.INTERCOM || room.RoomType == RoomType.CURVE))
                            {
                                str += " \"roty\": \"" + (obj.transform.localRotation.eulerAngles.y + 90).ToString() + "\", ";
                            }*/
                            if (room.ZoneType == ZoneType.ENTRANCE)
                                str += " \"roty\": \"" + (obj.transform.rotation.eulerAngles.y + 90f).ToString() + "\", ";
                            else
                                str += " \"roty\": \"" + (obj.transform.rotation.eulerAngles.y).ToString() + "\", ";
                            str += " \"rotz\": \"" + obj.transform.rotation.eulerAngles.z.ToString() + "\", ";

                            str += " \"id\": \"" + room.RoomType + "\" ";
                            str += " }";
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
                        if (keys.ContainsKey(play.SteamId))
                        {
                            str += " \"key\": \"" + keys[play.SteamId] + "\", ";
                        }
                        else
                        {
                            str += " \"key\": \"errorfindingkey\", ";
                        }
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
                    /*var objs = GameObject.Find("LightRooms").transform;
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
                    var objs2 = GameObject.Find("HeavyRooms").transform;
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
                        if (keys.ContainsKey(play.SteamId))
                        {
                            str += " \"key\": \"" + keys[play.SteamId] + "\", ";
                        }
                        else
                        {
                            str += " \"key\": \"errorfindingkey\", ";
                        }
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
                    str += ";";*/
                    ASCIIEncoding asen = new ASCIIEncoding();
                    byte[] ba = asen.GetBytes(str);

                    mod8.s.Write(ba, 0, ba.Length);
                }
                catch (Exception e)
                {
                    //plugin.Info(e.StackTrace);
                }
            }
        }
    }
}
