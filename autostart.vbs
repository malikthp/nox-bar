' NOX Bar Server – automatischer Start mit Windows (unsichtbar)
Set ws = CreateObject("WScript.Shell")
ws.CurrentDirectory = "C:\Users\surfa\Documente\Standardprojekt"
ws.Run """C:\Program Files\nodejs\node.exe"" server\server.js", 0, False
