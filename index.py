import numpy as np
import matplotlib.pyplot as plt

# Parametri
hbar = 1.0   # unità naturali
m = 1.0
omega = 1.0

# Tempo
t = np.linspace(0, 2*np.pi/omega, 500)

# Coordinate di fase
x = np.sqrt(hbar/(2*m*omega)) * np.cos(omega*t)
p = - np.sqrt(m*hbar*omega/2) * np.sin(omega*t)

# Grafico
plt.figure(figsize=(6,6))
plt.plot(x, p)
plt.xlabel(r'$\langle x \rangle$')
plt.ylabel(r'$\langle p \rangle$')
plt.title('Diagramma di fase dell\'oscillatore armonico')
plt.grid(True)
plt.axis('equal')
plt.show()