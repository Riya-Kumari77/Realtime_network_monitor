import psutil
import socket


def get_system_stats():
    return {
        "cpu_percent": psutil.cpu_percent(interval=1),
        "ram_percent": psutil.virtual_memory().percent,
        "ram_used_gb": round(
            psutil.virtual_memory().used / (1024 ** 3), 2
        ),
        "ram_total_gb": round(
            psutil.virtual_memory().total / (1024 ** 3), 2
        )
    }


def get_top_processes():

    process_list = []

    for process in psutil.process_iter([
        'pid',
        'name',
        'status',
        'memory_info'
    ]):

        try:

            process_list.append({

                "name":
                    process.info["name"],

                "pid":
                    process.info["pid"],

                "status":
                    process.info["status"],

                "cpu_percent":
                    process.cpu_percent(interval=None),

                "ram_mb":
                    round(
                        process.info["memory_info"].rss
                        / 1024 / 1024,
                        2
                    )

            })

        except (
            psutil.NoSuchProcess,
            psutil.AccessDenied,
            psutil.ZombieProcess
        ):
            pass

    process_list.sort(
        key=lambda x: x["ram_mb"],
        reverse=True
    )

    return process_list[:15]

def get_network_stats():

    network = psutil.net_io_counters()

    return {
        "bytes_sent": network.bytes_sent,
        "bytes_recv": network.bytes_recv,
        "ip_address": socket.gethostbyname(
            socket.gethostname()
        )
    }