using Smod2;
using Smod2.Attributes;
using System.Net;
using System.Net.Sockets;

namespace VirtualBrightPlayz.SCPSL.Mod8
{
    [PluginDetails(author = "VirtualBrightPlayz",
        description = "Mod8 desc",
        id = "virtualbrightplayz.scpsl.mod8",
        name = "Mod8",
        version = "1.0",
        SmodMajor = 3,
        SmodMinor = 0,
        SmodRevision = 0)]
    public class Mod8 : Plugin
    {
        public TcpClient tcp;
        public NetworkStream s;
        public RoomManager rm;

        public override void OnDisable()
        {
            tcp.Close();
        }

        public override void OnEnable()
        {
            this.Info("Mod8 plugin enabled.");
            this.Info("Connecting to node.js server");
            tcp = new TcpClient();
            tcp.Connect("127.0.0.1", 8080);
            s = tcp.GetStream();
            rm = new RoomManager();
        }

        public override void Register()
        {
            this.AddEventHandlers(new Mod8EventHandler(this));
            //this.AddCommand("pswd", new PasswordCmd(this));
        }
    }
}
