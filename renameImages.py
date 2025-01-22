import os
import sys

def rename_images(folder_path, prefix='slide', extension=None):
    # Obtiene una lista de archivos en el directorio especificado
    files = os.listdir(folder_path)
    # Filtra solo los archivos de imagen basados en la extensión
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    images = [f for f in files if os.path.splitext(f.lower())[1] in image_extensions]

    # Si no hay imágenes, salir
    if not images:
        print("No se encontraron imágenes en el directorio especificado.")
        return

    # Opcional: filtrar por extensión específica
    if extension:
        images = [f for f in images if f.lower().endswith(extension.lower())]
        if not images:
            print(f"No se encontraron imágenes con la extensión {extension} en el directorio especificado.")
            return

    # Ordena las imágenes para renombrarlas de forma consistente
    images.sort()

    # Renombrar las imágenes
    for index, filename in enumerate(images, start=1):
        ext = os.path.splitext(filename)[1]
        new_name = f"{prefix}{index}{ext}"
        src = os.path.join(folder_path, filename)
        dst = os.path.join(folder_path, new_name)
        # Renombrar solo si el nombre es diferente
        if src != dst:
            os.rename(src, dst)
            print(f"Renombrado: {filename} -> {new_name}")

if __name__ == "__main__":
    # Uso: python rename_images.py assets/images/
    if len(sys.argv) < 2:
        print("Uso: python rename_images.py <ruta_a_la_carpeta_de_imagenes> [prefijo] [extensión]")
    else:
        folder = sys.argv[1]
        prefijo = sys.argv[2] if len(sys.argv) >=3 else 'slide'
        ext = sys.argv[3] if len(sys.argv) >=4 else None
        rename_images(folder, prefix=prefijo, extension=ext)